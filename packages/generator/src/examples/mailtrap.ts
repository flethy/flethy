import { Mailtrap } from '@flethy/connectors/src/configs/mailtrap.config'

const sendEmail: Mailtrap.SendEmail = {
  kind: 'mailtrap.emails.send',
  'auth:Authorization': process.env.MAILTRAP_API_TOKEN,
  'body:from': {
    name: 'Adam',
    email: 'adam@flethy.com',
  },
  'body:to': [
    {
      name: 'Adam',
      email: 'adam.urban@gmail.com',
    },
  ],
  'body:subject': 'Hello from flethy',
  'body:text': 'Hello world!',
}

const sendTestEmail: Mailtrap.SendTestEmail = {
  kind: 'mailtrap.emails.test',
  'auth:Authorization': process.env.MAILTRAP_API_TOKEN,
  'param:inboxId': Number(process.env.MAILTRAP_INBOX_ID),
  'body:from': {
    name: 'Adam',
    email: 'adam@flethy.com',
  },
  'body:to': [
    {
      name: 'Adam',
      email: 'adam.urban@gmail.com',
    },
  ],
  'body:subject': 'Hello from flethy',
  'body:text': 'Hello world!',
}

const configs = {
  sendEmail,
  sendTestEmail,
}

export default { configs }
