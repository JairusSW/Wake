import { console } from './Modules/Console'
// ✅
import { fs } from './Modules/FS'
// ✅
import { WebSocket } from './Modules/WebSocket'
// ❌
import { UDPSocket } from './Modules/UDP'

import { http } from './Modules/HTTP'

import { EventEmitter } from './Modules/EventEmitter'

import { ChildProcess } from './Modules/ChildProcess'

export function test(): void {

    const socket = new UDPSocket('udp4')
    
    socket.on('message', (data) => {
    
        console.log('Message: ' + data)
    
    })
    
    socket.on('listening', () => {
    
        console.log('Listening')
    
    })
    
    socket.send('Hello From AssemblyScript!', 3000, 'localhost')
    
}