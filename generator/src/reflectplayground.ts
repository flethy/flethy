import { CoinGecko } from '../../http-configs/src/configs/coingecko.config'
import { getType, Type } from 'tst-reflect'

function main() {
  // let test = eval(`CoinGecko.CoinById`)
  type mytype = CoinGecko.CoinById

  // CoinGecko.

  // for (let mytype of CoinGecko.INTERFACES) {

  // }

  const coinGecko: Type = getType<CoinGecko.CoinById>()
  console.log(
    coinGecko
      .getProperties()
      .map(
        (prop) => `${prop.name}:${prop.type.name}|${prop.optional ? '' : '*'}`
      )
  )

  // const test: CoinGecko.INTERFACES[1]
  // console.log(CoinGecko)
  // const coinGecko: Type = getType<CoinGecko>()
}

main()
