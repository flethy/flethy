import * as fs from 'fs'
import * as path from 'path'
import { logger } from '../utils/Logger'
import { LANDINGPAGE_PUBLIC } from './brand.exporter'

const CONFIGS_DIR_NAME = 'configs'
const HTTP_CONFIGS_DIR_NAME = 'connectors'
const CONFIGS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  HTTP_CONFIGS_DIR_NAME,
  'src',
  CONFIGS_DIR_NAME
)

export class SitemapExporter {
  public static async export() {
    logger.info(`Updating sitemap.xml`)
    const files = fs.readdirSync(CONFIGS_DIR)
    const ids = files.map((file) => file.split('.')[0])

    const sitemap: string[] = [
      `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://flethy.com</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://flethy.com/integrations</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://flethy.com/pitch</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://flethy.com/roadmap</loc>
    <priority>0.9</priority>
  </url>`,
    ]
    ids.forEach((id) => {
      sitemap.push(`  <url>
    <loc>https://flethy.com/integrations/${id}</loc>
    <priority>0.8</priority>
  </url>`)
    })
    sitemap.push('</urlset>')
    fs.writeFileSync(`${LANDINGPAGE_PUBLIC}/sitemap.xml`, sitemap.join('\n'))
  }
}
