import { ConfigsExporter } from './exporters/configs.exporter'
import { DocsExporter } from './exporters/docs.exporter'
import { SitemapExporter } from './exporters/sitemap.exporter'
import { TypesExporter } from './exporters/types.exporter'
import { UseCasesExporter } from './exporters/usecases.exporter'

async function main() {
  await ConfigsExporter.export()
  await DocsExporter.export()
  await TypesExporter.export()
  await SitemapExporter.export()
  await UseCasesExporter.export()
}

main()
