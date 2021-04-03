// TODO: Transfer Full API
import { EventEmitter } from './EventEmitter'

export class ReadableStream extends EventEmitter {
  constructor() {
    super()
  }
  push(data: string) {
    this.emit('data', data)
  }
}

export class WriteableStream extends EventEmitter {
  constructor() {
    super()
  }
  write(data: string) {
    this.emit('data', data)
  }
}