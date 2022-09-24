import * as fs from 'fs'
import * as path from 'path'

const FLOW_DIR = path.join(__dirname, '..', '..', '..', 'flow')

export class FlowDependencyUpdate {
  public static update(newVersion: string) {
    const connectorsPackageJson = JSON.parse(
      fs.readFileSync(`${FLOW_DIR}/package.json`, 'utf8')
    )

    connectorsPackageJson.dependencies['@flethy/connectors'] = newVersion

    fs.writeFileSync(
      `${FLOW_DIR}/package.json`,
      JSON.stringify(connectorsPackageJson)
    )
  }
}

FlowDependencyUpdate.update('^0.0.150')
