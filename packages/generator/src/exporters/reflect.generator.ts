import fs from 'fs'
import path from 'path'
import { ConfigType } from '../../../http-configs/src/types/ConfigType.type'
import { configTypes as exportedConfigTypes } from './reflect.exporter'

const CONFIGSTYPES_DIR_NAME = 'configTypes'
const HTTP_CONFIGS_DIR_NAME = 'http-configs'
const CONFIGSTYPES_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  HTTP_CONFIGS_DIR_NAME,
  'src',
  CONFIGSTYPES_DIR_NAME
)

export class ConfigTypeGenerator {
  public static generate() {
    const configTypes: ConfigType[] = []
    for (const exportedConfigType of exportedConfigTypes) {
      let foundConfigType = configTypes.find(
        (type) => type.name === exportedConfigType.name
      )
      if (!foundConfigType) {
        foundConfigType = {
          name: exportedConfigType.name,
          interfaces: [],
        }
        configTypes.push(foundConfigType)
      }
      foundConfigType.interfaces.push({
        name: exportedConfigType.interface,
        properties: exportedConfigType.type.getProperties().map((property) => {
          return {
            name: property.name,
            type: property.type.name.toLowerCase(),
            types:
              property.type.literalValue ??
              property.type.types.map(
                (currentType) => currentType.literalValue
              ),
            optional: property.optional,
          }
        }),
      })
    }
    fs.writeFileSync(
      `${CONFIGSTYPES_DIR}/configTypes.json`,
      JSON.stringify(configTypes)
    )
  }
}

ConfigTypeGenerator.generate()
