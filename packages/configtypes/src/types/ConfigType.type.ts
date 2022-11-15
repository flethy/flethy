export interface ConfigTypeProperty {
  name: string
  type: string
  types: any
  optional?: boolean
  properties?: ConfigTypeProperty[]
}

export interface ConfigTypeInterface {
  name: string
  properties: ConfigTypeProperty[]
}

export interface ConfigType {
  id: string
  name: string
  interfaces: ConfigTypeInterface[]
}
