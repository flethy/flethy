import { configTypes } from './reflect.exporter'

// interface ConfigType {
//   name: string
//   type: string
//   optional: boolean
// }

for (const configType of configTypes) {
  const properties = configType.type.getProperties()
  console.log(`${configType.name}.${configType.interface}`)
  console.log(
    `${properties.map(
      (prop) => `${prop.name}:${prop.type.name}|${prop.optional ? '' : '*'}`
    )}`
  )
  console.log('\n')
}
