import * as net from 'net'
import { Record, Status } from './types'
import { parseReq, createResponse } from './helpers'

const PORT = 8080
const IP = '127.0.0.1'
const BACKLOG = 100

// TODO: Replace this storage with a proper database or memory cache
const state: Map<string, Record> = new Map()

net.createServer()
  .listen(PORT, IP, BACKLOG)
  .on('connection', socket => socket
    .on('data', buffer => {
      let response: string
      const req = parseReq(buffer.toString().trim())

      if (req.method === 'GET') {
        if (state.has(req.uri)) {
          response = createResponse(Status['200 OK'], state.get(req.uri))
        }
        else {
          response = createResponse(Status['404 Not Found'])
        }
      }
      else if (req.method === 'POST') {
        const record: Record = {
          body: req.body,
          contentType: req.headers.get('Content-Type')
        }
        state.set(req.uri, record)
        response = createResponse(Status['200 OK'])
      }
      else if (req.method === 'DELETE') {
        if (state.has(req.uri)) {
          state.delete(req.uri)
          response = createResponse(Status['200 OK'])
        }
        else {
          response = createResponse(Status['404 Not Found'])
        }
      }
      else {
        response = createResponse(Status['404 Not Found'])
      }
      socket.write(response)
      socket.end()
    }))