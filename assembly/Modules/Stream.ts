// TODO: Transfer Full API
// Crude Stream Implementation. Only Basic Functionality.

import { EventEmitter } from './EventEmitter'

import { console } from './Console'

export class ReadableStream extends EventEmitter {
  public highWaterMark: i32 = 16
  constructor() {
    super()
    this.on('data', (data) => {
      console.log(data)
    })
  }
  push(data: string): void {
    let lastChunkIndex = 0
    for (let i = 0; i < data.length / this.highWaterMark; i++) {
      lastChunkIndex = i * this.highWaterMark + this.highWaterMark
      let chunked = data.slice(i * this.highWaterMark, lastChunkIndex)   
      this.emit('data', chunked)
    }
    let lastChunk = data.slice(lastChunkIndex, data.length)
    this.emit('data', lastChunk)
  }
}