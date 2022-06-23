import * as fs from 'fs'
import * as path from 'path'
import { ApiDescription } from '../../../http-configs/src/types/ApiDescription.type'
import { logger } from '../utils/Logger'

const CONFIGS_DIR_NAME = 'configs'
const HTTP_CONFIGS_DIR_NAME = 'http-configs'
const CONFIGS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  HTTP_CONFIGS_DIR_NAME,
  'src',
  CONFIGS_DIR_NAME
)

const TEMP_EXPORTER_FILE = path.join(__dirname, 'reflect.exporter.ts')

export class TypesExporter {
  public static async export() {
    const tempExporter: string[] = [
      `import { getType, Type } from 'tst-reflect'`,
    ]
    const tempImports: string[] = []
    const tempContent: string[] = [
      `export const configTypes: Array<{type: Type; name: string; interface: string}> = []`,
    ]

    const files = fs.readdirSync(CONFIGS_DIR)
    for (const file of files) {
      const configName = `${file.split('.')[0]}.${file.split('.')[1]}`
      logger.info(`DocsExporter | Loading Config <${file}>`)
      // eslint-disable-next-line no-await-in-loop
      const Config = await import(`${CONFIGS_DIR}/${configName}`)
      try {
        const instanceOfConfig = Config.default
        const api: ApiDescription<any, any> = instanceOfConfig.API

        tempImports.push(
          `import { ${instanceOfConfig.API.meta.name} } from '../../../http-configs/src/configs/${configName}'`
        )

        Object.keys(api.api).forEach((key) => {
          Object.keys(api.api[key]).forEach((subkey) => {
            const endpoint = api.api[key][subkey]
            tempContent.push(
              `configTypes.push({type: getType<${instanceOfConfig.API.meta.name}.${endpoint.interface}>(), name: '${instanceOfConfig.API.meta.name}', interface: '${endpoint.interface}'})`
            )
          })
        })
      } catch (error) {
        logger.error(error)
      }
    }

    tempExporter.push(...tempImports)
    tempExporter.push(...tempContent)

    logger.info(`Writing temp file...`)
    fs.writeFileSync(`${TEMP_EXPORTER_FILE}`, `${tempExporter.join('\n')}`)
  }
}
