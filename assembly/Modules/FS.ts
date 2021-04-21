// TODO: Import full API

import { ReadableStream } from './Stream'

import { console } from './Console'

declare function fsWriteFileSync(path: string, data: Uint8Array): void

declare function fsReadFileSync(path: string): Uint8Array

declare function fsMkDirSync(path: string): void

declare function fsAppendFileSync(path: string, data: Uint8Array): void

declare function fsExistsSync(path: string): number

//declare function fsWriteStreamCall(data: string): void

declare function fsReadStreamCall(path: string, pointer: i32): void

export namespace fs {
    export function writeFileSync(path: string, data: Uint8Array): void {

        fsWriteFileSync(path, data)
        
    }
    export function readFileSync(path: string): Uint8Array {

        return fsReadFileSync(path)
        
    }
    export function mkDirSync(path: string): void {

        fsMkDirSync(path)
        
    }
    export function appendFileSync(path: string, data: Uint8Array): void {

        fsAppendFileSync(path, data)
        
    }
    export function existsSync(path: string): boolean {

        return fsExistsSync(path) === 1 ? true : false
        
    }
    export function createReadStream(path: string): ReadableStream {

        const stream = new ReadableStream()

        fsReadStreamCall(path, load<i32>(changetype<usize>(stream.push)))

        return stream

    }
}