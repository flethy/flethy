import puppeteer from 'puppeteer'
import { ConfigUtils } from '../../../connectors/src/utils/Config.utils'

export class NavigateToWebsites {
  public static async navigate() {
    console.log(`Starting browser`)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const allConfigs = ConfigUtils.getAllConfigs()
    const size = allConfigs.size
    let index = 0
    for (const key of allConfigs.keys()) {
      index++
      const config = allConfigs.get(key)
      if (config) {
        const base = config.meta.url
        const url = `${base}?utm_source=flethy&utm_medium=landing_page&utm_content=textlink`
        console.log(`${index}/${size} | Navigating to ${url}`)
        try {
          await page.goto(url)
        } catch (error) {
          console.error(`Failed to navigate to ${base}`)
        }
      }
    }
    console.log(`Closing Browser`)
    await browser.close()
  }
}

async function main() {
  await NavigateToWebsites.navigate()
}

main()
