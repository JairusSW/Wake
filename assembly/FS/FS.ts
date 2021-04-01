// TODO: Import full API

declare function fsWriteFileSync(path: string, data: Uint8Array): void

declare function fsReadFileSync(path: string): Uint8Array

declare function fsMkDirSync(path: string): void

declare function fsAppendFileSync(path: string, data: Uint8Array): void

declare function fsExistsSync(path: string): number

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
}