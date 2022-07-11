export interface ConfigTypeProperty {
  name: string
  type: string
  types: any
  optional: boolean
}

export interface ConfigTypeInterface {
  name: string
  properties: ConfigTypeProperty[]
}

export interface ConfigType {
  name: string
  interfaces: ConfigTypeInterface[]
}
