import fs from 'fs'
import path from 'path'
import { PropertyInfo } from 'tst-reflect'
import {
  ConfigType,
  ConfigTypeProperty,
} from '../../../connectors/src/types/ConfigType.type'
import { LANDINGPAGE_CONSTANTS } from './brand.exporter'
import { configTypes as exportedConfigTypes } from './reflect.exporter'

const CONFIGSTYPES_DIR_NAME = 'configTypes'
const PACKAGE_CONFIGTYPES_DIR_NAME = 'configtypes'
const CONFIGSTYPES_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  PACKAGE_CONFIGTYPES_DIR_NAME,
  'src',
  CONFIGSTYPES_DIR_NAME
)
// API COUNT
const API_COUNT_FILE = path.join(__dirname, '..', '..', 'data.json')

export class ConfigTypeGenerator {
  public static generate() {
    const configTypes: ConfigType[] = []
    for (const exportedConfigType of exportedConfigTypes) {
      let foundConfigType = configTypes.find(
        (type) => type.name === exportedConfigType.name
      )
      if (!foundConfigType) {
        foundConfigType = {
          id: exportedConfigType.id,
          name: exportedConfigType.name,
          interfaces: [],
        }
        configTypes.push(foundConfigType)
      }
      const foundInterfaceProperties = [
        ...exportedConfigType.type.getProperties().map((property) => {
          return ConfigTypeGenerator.generateProperties(property)
        }),
        ...exportedConfigType.type.baseType.getProperties().map((property) => {
          return ConfigTypeGenerator.generateProperties(property)
        }),
      ]
      const foundInterfacePropertiesWithoutDuplicates = []
      for (const foundInterfaceProperty of foundInterfaceProperties) {
        if (
          !foundInterfacePropertiesWithoutDuplicates.find(
            (property) => property.name === foundInterfaceProperty.name
          )
        ) {
          foundInterfacePropertiesWithoutDuplicates.push(foundInterfaceProperty)
        }
      }
      foundConfigType.interfaces.push({
        name: exportedConfigType.interface,
        properties: foundInterfacePropertiesWithoutDuplicates,
        // properties: [
        //   ...exportedConfigType.type.getProperties().map((property) => {
        //     return ConfigTypeGenerator.generateProperties(property)
        //   }),
        //   ...exportedConfigType.type.baseType
        //     .getProperties()
        //     .map((property) => {
        //       return ConfigTypeGenerator.generateProperties(property)
        //     }),
        // ],
      })
    }
    fs.writeFileSync(
      `${CONFIGSTYPES_DIR}/configTypes.json`,
      JSON.stringify(configTypes)
    )
    fs.writeFileSync(
      `${LANDINGPAGE_CONSTANTS}/configTypes.json`,
      JSON.stringify(configTypes)
    )

    const dataJsonContent = {
      apicount: configTypes.length,
      endpointcount: configTypes.reduce(
        (acc, current) => acc + current.interfaces.length,
        0
      ),
    }
    fs.writeFileSync(API_COUNT_FILE, JSON.stringify(dataJsonContent))
    fs.writeFileSync(
      `${LANDINGPAGE_CONSTANTS}/api.const.ts`,
      `export const API_COUNT = ${dataJsonContent.apicount}
export const API_ENDPOINT_COUNT = ${dataJsonContent.endpointcount}`
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
