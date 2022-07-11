import { CoinGecko } from '../../http-configs/src/configs/coingecko.config'
import { getType, Type } from 'tst-reflect'
import Clearbit from '../../http-configs/src/configs/clearbit.config'
import Courier from '../../http-configs/src/configs/courier.config'

function main() {
  // let test = eval(`CoinGecko.CoinById`)
  type mytype = CoinGecko.CoinById

  // CoinGecko.

  // for (let mytype of CoinGecko.INTERFACES) {

  // }

  const coinGecko: Type = getType<Courier.Send>()
  console.log(coinGecko.baseType)
  console.log(
    coinGecko.getProperties().map((prop) => {
      // return prop.getDecorators()
      return `${prop.name}:${prop.type.name}|${prop.optional ? '' : '*'}`
      // return prop.type.getProperties()
    }),
    { depth: 4 }
  )

  // const test: CoinGecko.INTERFACES[1]
  // console.log(CoinGecko)
  // const coinGecko: Type = getType<CoinGecko>()
}

main()
