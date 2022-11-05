import puppeteer from 'puppeteer'
import { ConfigUtils } from '../../../connectors/src/utils/Config.utils'
import { MARKETING_RESOURCES } from '../constants/marketing.const'

type NavigationType = 'integration' | 'blog'

interface NavigationProgress {
  type: NavigationType
  urls: string[]
  size: number
  success: number
  failed: number
  failedUrls: string[]
  index: number
}

export class NavigateToWebsites {
  private browser: puppeteer.Browser | undefined
  private page: puppeteer.Page | undefined
  private navigationProgressMap: Map<NavigationType, NavigationProgress> =
    new Map<NavigationType, NavigationProgress>()

  public async init() {
    console.log(`Starting browser`)
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
  }

  public async close() {
    if (this.browser) {
      console.log(`Closing browser`)
      await this.browser.close()
    }
  }

  public async navigateTo(base: string, progress: NavigationProgress) {
    if (this.page) {
      progress.index++
      const url = `${base}?utm_source=flethy&utm_medium=landing_page&utm_content=textlink`
      console.log(
        `| ${progress.type} | ${progress.index}/${progress.size} | Navigating to ${url}`
      )
      try {
        await this.page.goto(url)
        progress.success++
      } catch (error) {
        console.error(`Failed to navigate to ${base}`)
        progress.failed++
        progress.failedUrls.push(base)
      }
    }
  }

  public async navigateToAll() {
    const start = Date.now()
    // integrations
    const allConfigs = ConfigUtils.getAllConfigs()
    const integrationProgress: NavigationProgress = {
      type: 'integration',
      urls: [],
      size: allConfigs.size,
      success: 0,
      failed: 0,
      failedUrls: [],
      index: 0,
    }
    for (const key of allConfigs.keys()) {
      const config = allConfigs.get(key)
      if (config) {
        integrationProgress.urls.push(config.meta.url)
      }
    }

    // marketing
    const blogProgress: NavigationProgress = {
      type: 'blog',
      urls: MARKETING_RESOURCES.map((resource) => resource.url),
      size: MARKETING_RESOURCES.length,
      success: 0,
      failed: 0,
      failedUrls: [],
      index: 0,
    }

    const progresses = [blogProgress, integrationProgress]

    await this.init()
    for (const progress of progresses) {
      for (const url of progress.urls) {
        await this.navigateTo(url, progress)
      }
    }
    await this.close()

    // summary
    for (const progress of progresses) {
      console.log(
        `| ${progress.type} | Success: ${progress.success} | Failed: ${progress.failed} | Sum: ${progress.size}`
      )
      console.log(`Failed URLs: ${progress.failedUrls.join(', ')}`)
    }

    const end = Date.now()
    const seconds = Math.floor((end - start) / 1000)
    const minutes = Math.floor((end - start) / 1000 / 60)
    console.log(`Finished in ${minutes} minutes / ${seconds} seconds`)
  }
}

async function main() {
  const navigator = new NavigateToWebsites()
  await navigator.navigateToAll()
}

main()
