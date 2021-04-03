// TODO: Add headers and all protocols.
declare function getHTTP(url: string, callback: i32): void

export namespace http {
    export function get(url: string, callback: (body: string) => void): void {

        getHTTP(url, load<i32>(changetype<usize>(callback)))
        
    }
}