import Xkcd from '@flethy/connectors/src/configs/xkcd.config'

const current: Xkcd.GetCurrentComic = {
  kind: 'xkcd.core.current',
}

const get: Xkcd.GetComic = {
  kind: 'xkcd.core.get',
  'param:comicId': 1,
}

const configs = {
  current,
  get,
}

export default { configs }
