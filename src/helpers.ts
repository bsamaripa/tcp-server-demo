import { Record, Protocol, Status, Method, Request } from './types'

export const parseReq = (request: string): Request => {
  const req = request.split('\r\n')
  const [method, path, protocol] = req[0].split(' ')
  const headers = getHeaders(req)
  const body: string = method === 'POST' ? req[req.length - 1] : undefined

  return {
    protocol: Protocol[protocol as keyof typeof Protocol],
    method: Method[method as keyof typeof Method],
    uri: path.split('?')[0],
    headers,
    body
  } as Request
}

const getHeaders = (request: string[]): Map<string, string> => {
  const divider = request.indexOf('')
  const parsedHeaders = request.slice(1, divider).reduce((acc, header) => {
    const [k, v] = header.split(': ')
    return acc.set(k, v)
  }, new Map())

  return parsedHeaders
}

export const createResponse = (status: Status, rec?: Record): string => {
  const data = rec
    ? `\r\nContent-Type: ${rec.contentType}\r\nContent-length: ${rec.body.length}\r\n\r\n${rec.body}\r\n\r\n`
    : '\r\n\r\n'

  return `${Protocol['HTTP/1.1']} ${status}${data}`
}
