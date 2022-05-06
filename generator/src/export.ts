import { ConfigsExporter } from './exporters/configs.exporter'
import { DocsExporter } from './exporters/docs.exporter'

async function main() {
  await ConfigsExporter.export()
  await DocsExporter.export()
}

main()
