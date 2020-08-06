export enum Protocol { 'HTTP/1.1' = 'HTTP/1.1' }
export enum Status { '200 OK' = '200 OK', '404 Not Found' = '404 Not Found' }
export enum Method { GET = 'GET', POST = 'POST', DELETE = 'DELETE' }

export interface Record {
  body: string,
  contentType: string
}

export interface Request {
  protocol: Protocol
  method: Method
  uri: string
  headers: Map<string, string>
  body?: string
}