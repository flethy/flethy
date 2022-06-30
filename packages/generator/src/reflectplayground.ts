import { CoinGecko } from '../../http-configs/src/configs/coingecko.config'
import { getType, Type } from 'tst-reflect'
import Clearbit from '../../http-configs/src/configs/clearbit.config'

function main() {
  // let test = eval(`CoinGecko.CoinById`)
  type mytype = CoinGecko.CoinById

  // CoinGecko.

  // for (let mytype of CoinGecko.INTERFACES) {

  // }

  const coinGecko: Type = getType<Clearbit.LogoGet>()
  console.log(
    coinGecko.getProperties().map((prop) => {
      // return `${prop.name}:${prop.type.name}|${prop.optional ? '' : '*'}`
      return prop
    })
  )

  // const test: CoinGecko.INTERFACES[1]
  // console.log(CoinGecko)
  // const coinGecko: Type = getType<CoinGecko>()
}

main()
