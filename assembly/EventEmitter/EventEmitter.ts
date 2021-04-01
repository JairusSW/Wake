// EventEmitter Class
export class EventEmitter {
    private maxListeners: number = 10
    private pointers: Map<string, Array<i32>> = new Map<string, Array<i32>>()
    constructor() {}
    emit(event: string, data: string): void {
      if (this.pointers.has(event)) {
        const ptrs = this.pointers.get(event)
        for (let i = 0; i < ptrs.length; i++) {
          call_indirect(ptrs[i], data)
        }
      }
    }
    on(event: string, callback: (data: string) => void): void {
      if (!this.pointers.has(event)) {
        this.pointers.set(event, [load<i32>(changetype<usize>(callback))])
      } else {
        const ptrs = this.pointers.get(event)
        if (ptrs.length > this.maxListeners) {
          throw new Error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${ptrs.length} ${event} listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`)
        }
        ptrs.push(load<i32>(changetype<usize>(callback)))
        this.pointers.set(event, ptrs)
      }
    }
    getMaxListeners(): number {
      return this.maxListeners
    }
    setMaxListeners(n: number): void {
      this.maxListeners = n
    }
}