import * as fs from 'fs'
import markdownJson from 'markdown-json'
import * as path from 'path'
import { logger } from '../utils/Logger'
import { LANDINGPAGE_CONSTANTS } from './brand.exporter'

const USECASES_DIR = path.join(__dirname, '..', 'use-cases')
const USECASES_OUTPUT = `${USECASES_DIR}/output.json`

interface UseCase {
  title: string
  id: string
  contents: string[]
  services: string[]
  kinds: string[]
  tags: string[]
  hero?: string
}

export class UseCasesExporter {
  public static async export() {
    logger.info(`Generating uses cases`)

    const settings = {
      name: 'flethy-usecases',
      cwd: USECASES_DIR,
      src: './',
      filePattern: '**/*.md',
      ignore: '',
      dist: USECASES_OUTPUT,
      metadata: true,
      server: false,
      port: 3001,
      deterministicOrder: false,
    }

    await markdownJson(settings)

    const json = fs.readFileSync(USECASES_OUTPUT, 'utf8')
    const data = JSON.parse(json)

    const useCases: UseCase[] = []

    for (const item of data.data) {
      useCases.push({
        id: item.id,
        title: item.title,
        contents: UseCasesExporter.contentStringToContentArray(item.contents),
        services: item.services,
        kinds: item.kinds,
        tags: item.tags,
        hero: item.hero,
      })
    }

    const CONSTANT = `export const USECASES = ${JSON.stringify(useCases)}`
    fs.writeFileSync(`${LANDINGPAGE_CONSTANTS}/usecases.const.ts`, CONSTANT)

    fs.unlinkSync(USECASES_OUTPUT)
  }

  private static replaceTags(value: string, tag: string): string {
    return value.replace(`<${tag}>`, '').replace(`</${tag}>`, '')
  }

  private static contentStringToContentArray(value: string): string[] {
    const splitted = value
      .split('\n')
      .filter((line) => line !== '')
      .map((line: string) => UseCasesExporter.replaceTags(line, 'p'))
    return splitted
  }
}
