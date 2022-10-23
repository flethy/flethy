import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Typeform {
  export type Entity = { create: any }
  export type Endpoint = { create: ApiDescriptionEndpoint }

  export interface TypeformBase {
    'auth:Authorization': string
  }

  export interface CreateApiCreateForm extends TypeformBase, RequestParams {
    kind: 'typeform.create.create'
    'body:cui_settings'?: {
      avatar?: string
      is_typing_emulation_disabled?: boolean
      typing_emulation_speed?: 'slow' | 'medium' | 'fast'
    }
    'body:fields'?: Array<{
      attachement?: {
        type?: 'image' | 'video'
        href?: string
        scale?: '0.4' | '0.6' | '0.8' | '1'
        properties?: {
          description?: string
        }
      }
      field_type?: string
      id?: string
      layout?: {
        type?: 'split' | 'wallpaper' | 'float'
        placement?: 'left' | 'right'
        attachement?: {
          type?: 'image' | 'video'
          href?: string
          scale?: '0.4' | '0.6' | '0.8' | '1'
          properties?: {
            brightness?: number
            description?: string
            focal_point?: {
              x: number
              y: number
            }
          }
        }
      }
      name?: string
      options?: Array<{ label: string }>
      properties?: any[]
      ref?: string
      required?: boolean
      title: string
      type:
        | 'matrix'
        | 'ranking'
        | 'date'
        | 'dropdown'
        | 'email'
        | 'file_upload'
        | 'group'
        | 'legal'
        | 'long_text'
        | 'multiple_choice'
        | 'number'
        | 'opinion_scale'
        | 'payment'
        | 'picture_choice'
        | 'rating'
        | 'short_text'
        | 'statement'
        | 'website'
        | 'yes_no'
        | 'phone_number'
      validation?: {
        max_length?: number
        max_selection?: number
        max_value?: number
        min_selection?: number
        min_value?: number
        required?: boolean
      }
    }>
    'body:hidden'?: string[]
    'body:logic'?: Array<{
      type: 'field' | 'hidden'
      ref?: string
      actions: Array<{
        action: 'jump' | 'add' | 'subtract' | 'multiply' | 'divide' | 'set'
        details: {
          to?: {
            type: 'field' | 'thankyou' | 'outcome'
            value: string
          }
          target?: {
            type: 'variable'
            value: string
          }
          value?: {
            type: 'constant' | 'variable' | 'evaluation'
            value: string
          }
        }
        condition: {
          op:
            | 'begins_with'
            | 'ends_with'
            | 'contains'
            | 'not_contains'
            | 'lower_than'
            | 'lower_equal_than'
            | 'greater_than'
            | 'greater_equal_than'
            | 'is'
            | 'is_not'
            | 'equal'
            | 'not_equal'
            | 'always'
            | 'on'
            | 'not_on'
            | 'earlier_than'
            | 'earlier_than_or_on'
            | 'later_than'
            | 'later_than_or_on'
          vars: Array<{
            type: 'field' | 'hidden' | 'variable' | 'constant' | 'choice'
            value: any
          }>
        }
      }>
    }>
    bodysettings?: {
      language?: string
      is_public?: boolean
      progress_bar?: 'percentage' | 'proportion'
      show_progress_bar?: boolean
      show_typeform_branding?: boolean
      show_time_to_complete?: boolean
      show_number_of_submissions?: boolean
      hide_navigation?: boolean
      meta?: {
        title?: string
        allow_indexing?: boolean
        description?: string
        image?: {
          href?: string
        }
      }
      redirect_after_submit_url?: string
      google_analytics?: string
      facebook_pixel?: string
      google_tag_manager?: string
    }
    'body:thankyou_screens'?: Array<{
      ref?: string
      title: string
      type?: 'thankyou_screen' | 'url_redirect'
      properties?: {
        show_button?: boolean
        button_text?: string
        button_mode?: 'reload' | 'default_redirect' | 'redirect'
        redirect_url?: string
        share_icons?: boolean
      }
      attachement?: {
        type?: 'image' | 'video'
        href?: string
        scale?: '0.4' | '0.6' | '0.8' | '1'
        properties?: {
          description?: string
        }
      }
      layout?: {
        type?: 'split' | 'wallpaper' | 'float'
        placement?: 'left' | 'right'
        attachement?: {
          type?: 'image' | 'video'
          href?: string
          scale?: '0.4' | '0.6' | '0.8' | '1'
          properties?: {
            brightness?: number
            description?: string
            focal_point?: {
              x: number
              y: number
            }
          }
        }
      }
    }>
    'body:theme'?: string
    'body:title'?: string
    'body:type'?:
      | 'form'
      | 'quiz'
      | 'classification'
      | 'score'
      | 'branching'
      | 'classification_branching'
      | 'score_branching'
    'body:variables'?: {
      price?: number
      score?: number
    }
    'body:welcome_screens'?: Array<{
      ref?: string
      title: string
      type?: 'thankyou_screen' | 'url_redirect'
      properties?: {
        description?: string
        show_button?: boolean
        button_text?: string
      }
      attachement?: {
        type?: 'image' | 'video'
        href?: string
        scale?: '0.4' | '0.6' | '0.8' | '1'
        properties?: {
          description?: string
        }
      }
      layout?: {
        type?: 'split' | 'wallpaper' | 'float'
        placement?: 'left' | 'right'
        attachement?: {
          type?: 'image' | 'video'
          href?: string
          scale?: '0.4' | '0.6' | '0.8' | '1'
          properties?: {
            brightness?: number
            description?: string
            focal_point?: {
              x: number
              y: number
            }
          }
        }
      }
    }>
    'body:workspace'?: {
      href: string
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'typeform',
      name: 'Typeform',
      url: 'https://typeform.com/',
      docs: 'https://developer.typeform.com/',
      pricing: 'https://www.typeform.com/pricing/',
      signup: 'https://www.typeform.com/signup',
      social: {
        twitter: 'typeform',
        instagram: 'typeform',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'survey',
    },
    base: 'https://api.typeform.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      create: {
        create: {
          interface: 'CreateApiCreateForm',
          meta: {
            title: 'Create Form',
            description: `Create Form`,
            docs: 'https://developer.typeform.com/create/reference/create-form/',
          },
          method: 'POST',
          paths: [
            {
              name: 'forms',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Typeform
