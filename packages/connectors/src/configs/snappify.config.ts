import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Snappify {
  export type Entity = { snap: any }
  export type Endpoint = { simple: ApiDescriptionEndpoint }

  interface SnappifyBase {
    'auth:Authorization': string
  }

  export interface SimpleSnap extends SnappifyBase, RequestParams {
    kind: 'snappify.snap.simple'
    'body:code': string
    'body:language'?:
      | 'abap'
      | 'actionscript'
      | 'apache'
      | 'applescript'
      | 'astro'
      | 'bash'
      | 'c'
      | 'c++'
      | 'c#'
      | 'clojure'
      | 'cobol'
      | 'css'
      | 'dart'
      | 'docker'
      | 'elixir'
      | 'elm'
      | 'erlang'
      | 'gherkin'
      | 'graphql'
      | 'go'
      | 'groovy'
      | 'haskell'
      | 'html'
      | 'ini'
      | 'java'
      | 'javascript'
      | 'julia'
      | 'jupyter'
      | 'jsx'
      | 'json'
      | 'kotlin'
      | 'latex'
      | 'less'
      | 'lisp'
      | 'lua'
      | 'markdown'
      | 'matlab / octave'
      | 'mdx'
      | 'nginx'
      | 'objective c'
      | 'objective c++'
      | 'ocaml'
      | 'pascal'
      | 'perl'
      | 'php'
      | 'plain text'
      | 'pl/sql'
      | 'powershell'
      | 'prisma'
      | 'python'
      | 'r'
      | 'ruby'
      | 'rust'
      | 'sass'
      | 'scala'
      | 'shell'
      | 'smalltalk'
      | 'solidity'
      | 'sql'
      | 'stylus'
      | 'svelte'
      | 'swift'
      | 'toml'
      | 'typescript'
      | 'tsx'
      | 'visual basic'
      | 'vue'
      | 'wasm'
      | 'xml'
      | 'yaml'
      | 'zsh'
    'body:type'?:
      | 'bt-vivid-black'
      | 'dark-plus'
      | 'darcula'
      | 'dracula-soft'
      | 'dracula'
      | 'github-dark-dimmed'
      | 'github-dark'
      | 'lucario'
      | 'lucario-custom'
      | 'material-darker'
      | 'material-default'
      | 'material-deep-ocean'
      | 'material-ocean'
      | 'material-palenight'
      | 'mayukai-sunset'
      | 'min-dark'
      | 'monokai'
      | 'nightowl'
      | 'nord'
      | 'one-dark-pro'
      | 'panda-syntax'
      | 'poimandres'
      | 'rouge'
      | 'slack-dark'
      | 'solarized-dark'
      | 'sublime-oceanic'
      | 'vitesse-dark'
      | 'github-light'
      | 'light-plus'
      | 'material-lighter'
      | 'min-light'
      | 'nightowl-light'
      | 'slack-ochin'
      | 'solarized-light'
      | 'vitesse-light'
    'body:background'?: string
    'body:codeBackground'?: string
    'body:profileInfo'?: {
      showFullname?: boolean
      showUsername?: boolean
      showAvatar?: boolean
      position?: 'bottom-left' | 'bottom-center' | 'bottom-right'
      snale?: number
    }
    'body:fileName'?: string
    'body:hideTab'?: boolean
    'body:fontLigatures'?: boolean
    'body:showWatermark'?: boolean
    'body:paddingLeft'?: number
    'body:paddingRight'?: number
    'body:paddingTop'?: number
    'body:paddingBottom'?: number
    'body:aspectRatio'?: {
      width?: number
      height?: number
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'snappify',
      name: 'Snappify',
      url: 'https://snappify.com/',
      docs: 'https://snappify.com/docs/api/simple-snap',
      signup: 'https://snappify.com/signup',
      pricing: 'https://snappify.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'snappify_io',
      },
    },
    base: 'https://api.snappify.com',
    api: {
      snap: {
        simple: {
          interface: 'SimpleSnap',
          meta: {
            title: 'Simple Snap API',
            description: 'Simple Snap API',
            docs: 'https://snappify.com/docs/api/simple-snap',
          },
          method: 'POST',
          paths: [
            {
              name: 'snap',
              type: 'static',
            },
            {
              name: 'simple',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Snappify
