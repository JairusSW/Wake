const fs = require('fs')

let Websockets = []

const ws = require('ws')

let UDPsockets = []

const dgram = require('dgram');

class WakeImport {
    
    constructor() {
        
        this._exports = null

        this.wasmImports = {
            Console: {
                consoleDebug: (message) => {
        
                    console.debug(this._exports.__getString(message))
        
                },
                consoleError: (message) => {
        
                    console.error(this._exports.__getString(message))
        
                },
                consoleInfo: (message) => {
        
                    console.info(this._exports.__getString(message))
        
                },
                consoleTime: (label) => {
        
                    console.time(this._exports.__getString(label))
        
                },
                consoleTimeEnd: (label) => {
        
                    console.timeEnd(this._exports.__getString(label))
        
                },
                consoleTimeLog: (label) => {
        
                    console.timeLog(this._exports.__getString(label))
        
                },
                consoleWarn: (message) => {
        
                    console.warn(this._exports.__getString(message))
        
                },
                consoleLog: (message) => {
        
                    console.log(this._exports.__getString(message))
        
                }
            },
            FS: {
                fsWriteFileSync: (path, data) => {
        
                    fs.writeFileSync(this._exports.__getString(path), Uint8Array.from(this._exports.__getArray(data)))
        
                },
                fsReadFileSync: (path) => {
        
                    const array = fs.readFileSync(this._exports.__getString(path))
        
                    // TODO: Check in with @battagline
        
                    return this._exports.__newArray(3, array)
        
                },
                fsMkDirSync: (path) => {
        
                    fs.mkdirSync(this._exports.__getString(path))
        
                },
                fsAppendFileSync: (path, data) => {
        
                    fs.appendFileSync(this._exports.__getString(path), Uint8Array.from(this._exports.__getArray(data)))
        
                },
                fsExistsSync: (path) => {
        
                    return fs.existsSync(this._exports.__getString(path)) ? 1 : 0
        
                },
            },
            WebSocket: {
                sendPointer: (id, event, pointer) => {
        
                    if (!Websockets[id]) return
        
                    Websockets[id]['pointers'][this._exports.__getString(event).toLowerCase().trim()] = this._exports.table.get(pointer)
        
                },
                initWS: (address) => {
        
                    Websockets.push({
                        pointers: {
                            message: null,
                            error: null,
                            listening: null,
                            connect: null,
                            close: null
                        },
                        socket: new ws(this._exports.__getString(address)),
                        cache: [],
                        ready: false
                    })
        
                    let id = Websockets.length - 1
        
                    let socket = Websockets[id]
        
                    // Handle messages before ready (b/c closures) :P
                    socket.socket.on('open', () => {
        
                        socket.ready = true
        
                        for (const message of socket.cache) {
        
                            socket.socket.send(message)
                            
                        }
                    })
        
                    socket.socket.on('message', (data, info) => {
        
                        const func = socket.pointers['message']
        
                        if (typeof func === 'function') func(this._exports.__newString(data))
        
                    })
        
                    socket.socket.on('listening', () => {
                    
                        const func = socket.pointers['listening']
        
                        if (typeof func === 'function') func()
        
                    })
        
                    socket.socket.on('close', () => {
                    
                        const func = socket.pointers['close']
        
                        if (typeof func === 'function') func()
        
                    })
        
                    socket.socket.on('error', (err) => {
                    
                        const func = socket.pointers['error']
        
                        if (typeof func === 'function') func(this._exports.__getString(err))
        
                    })
        
                    socket.socket.on('connect', () => {
                    
                        const func = socket.pointers['connect']
        
                        if (typeof func === 'function') func()
        
                    })
                    
                    return id
        
                },
                sendWS: (id, message) => {
        
                    if (Websockets[id].ready === false) {
                        
                        Websockets[id].cache.push(this._exports.__getArray(message))
        
                        return
                        
                    }
        
                    Websockets[id]['socket'].send(this._exports.__getArray(message))
        
                    return
        
                },
                closeWS: (id, number) => {
        
                    Websockets[id]['socket'].close(number)
        
                }
            },
            UDP: {
                sendPointer: (id, event, pointer) => {
        
                    if (!UDPsockets[id]) return
            
                    UDPsockets[id]['pointers'][this._exports.__getString(event).toLowerCase().trim()] = this._exports.table.get(pointer)
            
                },
                initUDP: (type) => {
            
                    UDPsockets.push({
                        pointers: {
                            message: null,
                            error: null,
                            listening: null,
                            connect: null,
                            close: null
                        },
                        socket: dgram.createSocket('udp' + type + '')
                    })
            
                    let id = UDPsockets.length - 1
            
                    let socket = UDPsockets[id]
            
                    socket.socket.on('message', (data, info) => {
        
                        const messagePtr = this._exports.__newString(data.toString('utf8'))
            
                        const func = socket.pointers['message']
            
                        if (typeof func === 'function') func(messagePtr)
            
                    })
            
                    socket.socket.on('listening', () => {
                    
                        const func = socket.pointers['listening']
            
                        if (typeof func === 'function') func()
            
                    })
            
                    socket.socket.on('close', () => {
                    
                        const func = socket.pointers['close']
            
                        if (typeof func === 'function') func()
            
                    })
            
                    socket.socket.on('error', (err) => {
                    
                        const func = socket.pointers['error']
            
                        if (typeof func === 'function') {
                            
                            if (err) return func(__newString(err.message))
        
                            func()
        
                        }
            
                    })
            
                    socket.socket.on('connect', () => {
                    
                        const func = socket.pointers['connect']
            
                        if (typeof func === 'function') func()
            
                    })
                    
                    return id
            
                },
                sendUDP: (id, message, port, address) => {
            
                    UDPsockets[id]['socket'].send(Buffer.from(this._exports.__getArray(message)), port, this._exports.__getString(address))
            
                    return
            
                },
                closeUDP: (id) => {
            
                    UDPsockets[id]['socket'].close()
            
                },
                bindUDP: (id, port, address) => {
            
                    UDPsockets[id]['socket'].bind(port, this._exports.__getString(address))
            
                }
            }
        }
    }

    get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this._exports = e
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this.table.get(fnIndex)
	}
}

module.exports = WakeImport