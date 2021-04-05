import { console } from './Modules/Console'

import { EventEmitter } from './Modules/EventEmitter'

import { ChildProcess } from './Modules/ChildProcess'

import { fs } from './Modules/FS'

import { http } from './Modules/http'

import { UDPSocket } from './Modules/UDP'

import { WebSocket } from './Modules/WebSocket'

export function test(): void {

    ChildProcess.exec('node --help', (stdout) => {

        console.log(stdout)
        
    })

}