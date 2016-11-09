const { send, json } = require('micro')
const heady = require('heady')
const isPresent = require('is-present')

module.exports = async (req, res) => {
  const urls = await json(req)
  const resObj = {}

  const px = urls.map(url => heady(url).then(head => resObj[url] = head))

  try {
    await Promise.all(px)
    send(res, 200, resObj)
  } catch (e) { send(res, 500, e) }
}
