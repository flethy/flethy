import { Brandfetch, nao } from '@flethy/connectors'
import { HttpRequest } from '../controllers/HttpRequest'
import * as fs from 'fs'
import * as path from 'path'
import { DOCS_BASE } from './docs.exporter'
import { logger } from '../utils/Logger'

const BRANDS_DIR = `${DOCS_BASE}/brands`
const BRAND_LOGOS = `${DOCS_BASE}/brand-logos`
const LANDINGPAGE_BASE = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'apps',
  'landing-page'
)
export const LANDINGPAGE_PUBLIC = `${LANDINGPAGE_BASE}/public`
export const LANDINGPAGE_INTEGRATIONS = `${LANDINGPAGE_PUBLIC}/integrations`
export const LANDINGPAGE_CONSTANTS = `${LANDINGPAGE_BASE}/src/constants`

export class BrandExporter {
  private files: string[] = []

  public readLoadedBrands() {
    this.files = fs.readdirSync(BRANDS_DIR)
  }

  public async exportOne(instanceOfConfig: any) {
    const id = instanceOfConfig.API.meta.id
    logger.info(`Fetching Brand information for <${id}>`)
    if (this.files.includes(`${id}.json`)) {
      logger.info(`Skipping <${id}> - already exists`)
      return
    }
    const url = instanceOfConfig.API.meta.url
    const domain = url.split('/')[2]

    const config = nao<Brandfetch.BrandByDomainOrId>({
      kind: 'brandfetch.brands.byDomainOrId',
      'auth:Authorization': process.env.BRANDFETCH_API_KEY,
      'param:domainOrId': domain,
    })

    try {
      const response = await HttpRequest.request(config)

      fs.writeFileSync(`${BRANDS_DIR}/${id}.json`, JSON.stringify(response))
    } catch (error) {
      logger.error(`Failed to load brand information for <${id}>`)
    }
  }

  public async fetchLogos() {
    logger.info(`Fetching Brand logos`)
    this.readLoadedBrands()
    const logos = fs.readdirSync(BRAND_LOGOS)
    for (const brand of this.files) {
      const id = brand.split('.')[0]
      const foundLogo = logos.find((logo) => logo.includes(id))
      if (!foundLogo) {
        const brandJson: any = JSON.parse(
          fs.readFileSync(`${BRANDS_DIR}/${brand}`, 'utf8')
        )
        if (brandJson.logo) {
          let availableLogos = brandJson.logos.find(
            (logo) => logo.type === 'logo'
          )
          if (!availableLogos) {
            availableLogos = brandJson.logos.find(
              (logo) => logo.type === 'icon'
            )
          }
          if (availableLogos?.formats) {
            for (const logoUrl of availableLogos.formats) {
              if (logoUrl.format !== 'svg') {
                const logoImage = await HttpRequest.request({
                  method: 'GET',
                  url: logoUrl.src,
                  responseType: 'stream',
                })
                const w = logoImage.pipe(
                  fs.createWriteStream(`${BRAND_LOGOS}/${id}.${logoUrl.format}`)
                )
                w.on('finish', () => {
                  logger.info(`Successfully downloaded logo for <${id}>`)
                })
              } else {
                const logoImage = await HttpRequest.request({
                  method: 'GET',
                  url: logoUrl.src,
                })
                fs.writeFileSync(
                  `${BRAND_LOGOS}/${id}.${logoUrl.format}`,
                  logoImage
                )
              }
            }
          } else {
            logger.error(`No formats found for <${id}>`)
          }
        }
      }
    }
  }

  public exportLogosToLandingPage() {
    logger.info(`Exporting Brand logos to Landing Page`)
    this.readLoadedBrands()
    const logos = fs.readdirSync(BRAND_LOGOS)
    const logoMap: Map<string, string> = new Map<string, string>()
    for (const logo of logos) {
      const splitted = logo.split('.')
      const id = splitted[0]
      logoMap.set(id, logo)
    }
    const lightBrands: string[] = [
      '1inch',
      'apiflash',
      'bigdatacloud',
      'calendarific',
      'camunda',
      'codedetection',
      'coinlayer',
      'courier',
      'covalent',
      'dataddo',
      'directus',
      'mezmo',
      'ory',
      'restdb',
      'serpapi',
      'unlayer',
      'up42',
    ]
    const logoArray: Array<{
      id: string
      file: string
      light?: boolean
      description?: string
    }> = []
    for (const fileName of logoMap.keys()) {
      const brandJson: any = JSON.parse(
        fs.readFileSync(`${BRANDS_DIR}/${fileName}.json`, 'utf8')
      )
      logoArray.push({
        id: fileName,
        file: logoMap.get(fileName),
        light: lightBrands.includes(fileName),
        description: brandJson.description,
      })
    }
    const integrationConstants = `export const INTEGRATIONS = ${JSON.stringify(
      logoArray
    )}`
    fs.writeFileSync(
      `${LANDINGPAGE_CONSTANTS}/integrations.const.ts`,
      integrationConstants
    )
    for (const logo of logoArray) {
      fs.copyFileSync(
        `${BRAND_LOGOS}/${logo.file}`,
        `${LANDINGPAGE_INTEGRATIONS}/${logo.file}`
      )
    }
  }
}
