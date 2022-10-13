const { WarpNodeFactory } = require('warp1')
const path = require('path')
const http = require('http')
const send = require('http-json-response')
const Arweave = require('arweave')
const cors = require('permissive-cors')
const corsMiddleware = cors()

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const warp = WarpNodeFactory.fileCached(arweave, path.join(__dirname, 'warp1-cache'))

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, async () => {
    const result = await warp.contract('aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA').setEvaluationOptions({
      internalWrites: true,
      allowUnsafeClient: true,
      allowBigInt: true
    }).readState()
    //console.log(result)
    send(res, result.state)
  })

})

server.listen(3000)
