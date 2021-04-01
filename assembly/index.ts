import { console } from './Console/Console'

import { fs } from './FS/FS'

import { WebSocket } from './WebSocket/WebSocket'

import { UDPSocket } from './UDP/UDP'

import { http } from './http/HTTP'

export function test(): void {

    http.get('http://localhost:3000/', (body) => {

        console.log('Body: ' + body)

    })
    
}