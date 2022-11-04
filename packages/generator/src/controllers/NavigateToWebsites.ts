import puppeteer from 'puppeteer'
import { ConfigUtils } from '../../../connectors/src/utils/Config.utils'

export class NavigateToWebsites {
  public static async navigate() {
    console.log(`Starting browser`)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const allConfigs = ConfigUtils.getAllConfigs()
    const size = allConfigs.size
    const index = {
      all: 0,
      success: 0,
      failed: 0,
      failedUrls: [],
    }
    for (const key of allConfigs.keys()) {
      index.all++
      const config = allConfigs.get(key)
      if (config) {
        const base = config.meta.url
        const url = `${base}?utm_source=flethy&utm_medium=landing_page&utm_content=textlink`
        console.log(`${index.all}/${size} | Navigating to ${url}`)
        try {
          await page.goto(url)
          index.success++
        } catch (error) {
          console.error(`Failed to navigate to ${base}`)
          index.failed++
          index.failedUrls.push(base)
        }
      }
    }
    console.log(`Closing Browser`)
    await browser.close()
    console.log(
      `Done | Success: ${index.success} | Failed: ${index.failed} | Sum: ${size}`
    )
    console.log(`Failed URLs: ${index.failedUrls.join(', ')}`)
  }
}

async function main() {
  await NavigateToWebsites.navigate()
}

main()
