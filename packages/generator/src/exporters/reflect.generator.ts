import fs from 'fs'
import path from 'path'
import { PropertyInfo } from 'tst-reflect'
import {
  ConfigType,
  ConfigTypeProperty,
} from '../../../http-configs/src/types/ConfigType.type'
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
        properties: [
          ...exportedConfigType.type.getProperties().map((property) => {
            return ConfigTypeGenerator.generateProperties(property)
          }),
          ...exportedConfigType.type.baseType
            .getProperties()
            .map((property) => {
              return ConfigTypeGenerator.generateProperties(property)
            }),
        ],
      })
    }
    fs.writeFileSync(
      `${CONFIGSTYPES_DIR}/configTypes.json`,
      JSON.stringify(configTypes)
    )
  }

  private static generateProperties(
    property: PropertyInfo
  ): ConfigTypeProperty {
    return {
      name: property.name,
      type: property.type.name.toLowerCase(),
      types:
        property.type.literalValue ??
        property.type.types.map((currentType) => currentType.literalValue),
      optional: property.optional,
      properties:
        property.type.getProperties().length > 0
          ? property.type
              .getProperties()
              .map((subProperty) =>
                ConfigTypeGenerator.generateProperties(subProperty)
              )
          : undefined,
    }
  }
}

ConfigTypeGenerator.generate()
