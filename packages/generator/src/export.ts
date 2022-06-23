import { ConfigsExporter } from './exporters/configs.exporter'
import { DocsExporter } from './exporters/docs.exporter'
import { TypesExporter } from './exporters/types.exporter'

async function main() {
  await ConfigsExporter.export()
  await DocsExporter.export()
  await TypesExporter.export()
}

main()
