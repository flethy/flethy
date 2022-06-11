import { CoinGecko } from '../../http-configs/src/configs/coingecko.config'
import { getType, Type } from 'tst-reflect'

function main() {
  const coinGecko: Type = getType<CoinGecko.CoinById>()
  console.log(
    coinGecko.getProperties().map((prop) => `${prop.name}:${prop.type.name}`)
  )
}

main()
