import { Template } from '../types/template.types'
import { Auth0CreateUser } from './identity/auth0-create-user'
import { TwitterThread } from './social-media/twitter-thread.template'
import { WebhookSite } from './utils/webhook-site-request.template'

export const TEMPLATES: Template[] = [
  TwitterThread,
  Auth0CreateUser,
  WebhookSite,
]
