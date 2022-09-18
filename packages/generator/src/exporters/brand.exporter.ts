import { Brandfetch, nao } from '@flethy/connectors'
import { HttpRequest } from '../controllers/HttpRequest'
import * as fs from 'fs'
import { DOCS_BASE } from './docs.exporter'
import { logger } from '../utils/Logger'

const BRANDS_DIR = `${DOCS_BASE}/brands`
const BRAND_LOGOS = `${DOCS_BASE}/brand-logos`

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
}
