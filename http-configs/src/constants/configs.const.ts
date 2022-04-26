import { ApiDescription } from '../types/ApiDescription.type'
import { Alchemy } from '../configs/alchemy.config'
import { Etherscan } from '../configs/etherscan.config'
import { MailerSend } from '../configs/mailersend.config'
import { OpenSea } from '../configs/opensea.config'
import { Pinata } from '../configs/pinata.config'
import { Slack } from '../configs/slack.config'
import { TheGraph } from '../configs/thegraph.config'
import { Web3Storage } from '../configs/web3storage.config'

export const CONFIGS: Map<string, ApiDescription<any, any>> = new Map<
  string,
  ApiDescription<any, any>
>([
  ['alchemy', Alchemy.API],
  ['etherscan', Etherscan.API],
  ['mailersend', MailerSend.API],
  ['opensea', OpenSea.API],
  ['pinata', Pinata.API],
  ['slack', Slack.API],
  ['thegraph', TheGraph.API],
  ['web3storage', Web3Storage.API],
])
