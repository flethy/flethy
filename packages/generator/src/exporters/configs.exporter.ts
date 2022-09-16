import * as fs from 'fs'
import * as path from 'path'
import { logger } from '../utils/Logger'
import { BrandExporter } from './brand.exporter'

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
const OUTPUT_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  HTTP_CONFIGS_DIR_NAME,
  'src',
  'constants'
)
const CONFIG_CONST_FILENAME = 'configs.const.ts'
// INDEX
const INDEX_FILE = path.join(
  __dirname,
  '..',
  '..',
  '..',
  HTTP_CONFIGS_DIR_NAME,
  'src',
  'index.ts'
)
// API COUNT
const API_COUNT_FILE = path.join(__dirname, '..', '..', 'data.json')

export class ConfigsExporter {
  public static async export() {
    const imports: string[] = [
      `import { ApiDescription } from '../types/ApiDescription.type'`,
    ]
    const exports: string[] = []
    const mapEntries: string[] = []

    const files = fs.readdirSync(CONFIGS_DIR)
    const dataJsonContent = { apicount: files.length }
    const brandExporter = new BrandExporter()
    brandExporter.readLoadedBrands()
    for (const file of files) {
      if (file.split('.')[1] !== 'config') {
        continue
      }
      const configName = `${file.split('.')[0]}.${file.split('.')[1]}`
      logger.info(`ConfigsExporter | Loading Config <${file}>`)
      // eslint-disable-next-line no-await-in-loop
      const Config = await import(`${CONFIGS_DIR}/${configName}`)
      try {
        const instanceOfConfig = Config.default
        await brandExporter.exportOne(instanceOfConfig)
        imports.push(
          `import { ${instanceOfConfig.API.meta.name} } from '../configs/${configName}'`
        )
        exports.push(
          `export { ${instanceOfConfig.API.meta.name} } from './configs/${configName}'`
        )
        mapEntries.push(
          `['${instanceOfConfig.API.meta.id}', ${instanceOfConfig.API.meta.name}.API],`
        )
      } catch (error) {
        logger.error(error)
      }
    }
    exports.push(
      `export { HttpRequestConfig, nao } from './utils/Request.utils'`
    )
    exports.push(`export type { ConfigType } from './types/ConfigType.type'`)
    exports.push(
      `export { CONFIG_TYPES } from './configTypes/configTypes.const'`
    )
    const constantContent: string[] = [...imports, '']
    constantContent.push(
      `export const CONFIGS: Map<string, ApiDescription<any, any>> = new Map<string, ApiDescription<any, any>>([`
    )
    constantContent.push(...mapEntries)
    constantContent.push(`])`)
    logger.info(`Writing output...`)
    fs.writeFileSync(
      `${OUTPUT_DIR}/${CONFIG_CONST_FILENAME}`,
      constantContent.join('\n')
    )
    logger.info(`Writing exports...`)
    fs.writeFileSync(INDEX_FILE, exports.join('\n'))
    logger.info(`Exported ${files.length} configs.`)
    logger.info(`Writing data json...`)
    fs.writeFileSync(API_COUNT_FILE, JSON.stringify(dataJsonContent))
    await brandExporter.fetchLogos()
  }
}
