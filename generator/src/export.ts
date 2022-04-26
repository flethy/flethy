import { ConfigsExporter } from './exporters/configs.exporter'

async function main() {
  await ConfigsExporter.export()
}

main()
