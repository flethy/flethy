export interface ConfigTypeProperty {
  name: string
  type: string
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
