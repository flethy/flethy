import fs from 'fs'
import readline from 'readline'

interface TemplateProps {
  id: string
  name: string
  url: string
  docs: string
  signup: string
  pricing: string
}

const TEMPLATE = (props: TemplateProps) => `import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ${props.name} {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: '${props.id}..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: '${props.id}',
      name: '${props.name}',
      url: '${props.url}',
      docs: '${props.docs}',
      signup: '${props.signup}',
      pricing: '${props.pricing}',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {},
    },
    base: '',
    api: {
      test: {
        test: {
          interface: '',
          meta: {
            title: '',
            description: '',
            docs: '',
          },
          method: 'GET',
          paths: [
            {
              name: '',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ${props.name}
`

class TemplateCreator {
  static async askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    const answer = await new Promise<string>((resolve) => {
      rl.question(`\n${question}\n`, (id) => {
        resolve(id)
      })
    })
    rl.close()
    return answer
  }

  public static async createTemplate() {
    const props: TemplateProps = {
      id: '',
      name: '',
      url: '',
      docs: '',
      signup: '',
      pricing: '',
    }
    console.log(`Creating new Config\n`)

    props.id = await this.askQuestion(`ID?`)
    props.name = await this.askQuestion(`Name?`)
    props.url = await this.askQuestion(`URL?`)
    props.docs = await this.askQuestion(`Docs?`)
    props.signup = await this.askQuestion(`Signup?`)
    props.pricing = await this.askQuestion(`Pricing?`)

    const config = TEMPLATE(props)
    const configFile = `${__dirname}/../../../connectors/src/configs/${props.id}.config.ts`
    fs.writeFileSync(configFile, config)
  }
}

TemplateCreator.createTemplate()
