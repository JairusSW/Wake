const fs = require("fs");
const loader = require('@assemblyscript/loader');

let wasmModule

// WebSocket
let WSsockets = []

const ws = require('ws')

// UDP

let UDPsockets = []

const dgram = require('dgram');

// HTTP

const { fetch } = require('cross-fetch')

const imports = {
    FS: {
        fsWriteFileSync: (path, data) => {

            fs.writeFileSync(wasmModule.exports.__getString(path), Uint8Array.from(wasmModule.exports.__getArray(data)))

        },
        fsReadFileSync: (path) => {

            const array = fs.readFileSync(wasmModule.exports.__getString(path))

            // TODO: Check in with @battagline

            return wasmModule.exports.__newArray(3, array)

        },
        fsMkDirSync: (path) => {

            fs.mkdirSync(wasmModule.exports.__getString(path))

        },
        fsAppendFileSync: (path, data) => {

            fs.appendFileSync(wasmModule.exports.__getString(path), Uint8Array.from(wasmModule.exports.__getArray(data)))

        },
        fsExistsSync: (path) => {

            return fs.existsSync(wasmModule.exports.__getString(path)) ? 1 : 0

        },
    },
    Console: {
        consoleDebug: (message) => {

            console.debug(wasmModule.exports.__getString(message))

        },
        consoleError: (message) => {

            console.error(wasmModule.exports.__getString(message))

        },
        consoleInfo: (message) => {

            console.info(wasmModule.exports.__getString(message))

        },
        consoleTime: (label) => {

            console.time(wasmModule.exports.__getString(label))

        },
        consoleTimeEnd: (label) => {

            console.timeEnd(wasmModule.exports.__getString(label))

        },
        consoleTimeLog: (label) => {

            console.timeLog(wasmModule.exports.__getString(label))

        },
        consoleWarn: (message) => {

            console.warn(wasmModule.exports.__getString(message))

        },
        consoleLog: (message) => {

            console.log(wasmModule.exports.__getString(message))

        }
    },
    WebSocket: {
        sendPointer: (id, event, pointer) => {

            if (!WSsockets[id]) return
    
            WSsockets[id]['pointers'][wasmModule.exports.__getString(event).toLowerCase().trim()] = wasmModule.exports.table.get(pointer)
    
        },
        initWS: (address) => {
    
            WSsockets.push({
                pointers: {
                    message: null,
                    error: null,
                    open: null,
                    connect: null,
                    close: null
                },
                socket: new ws(wasmModule.exports.__getString(address)),
                cache: [],
                ready: false
            })
    
            let id = WSsockets.length - 1
    
            let socket = WSsockets[id]

            socket.socket.on('message', (data) => {

                const messagePtr = wasmModule.exports.__newString(data.toString())
    
                const func = socket.pointers['message']
    
                if (typeof func === 'function') func(messagePtr)
    
            })

            socket.socket.on('open', () => {
            
                const func = socket.pointers['open']
    
                if (typeof func === 'function') func()

                socket.ready = true

                for (const message of socket.cache) {

                    socket.socket.send(message)
                    
                }
    
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
            
            return id
    
        },
        sendWS: (id, message) => {
    
            if (WSsockets[id].ready === false) {
                
                WSsockets[id].cache.push(wasmModule.exports.__getArray(message))

                return
                
            }

            WSsockets[id]['socket'].send(wasmModule.exports.__getArray(message))
    
            return
    
        },
        closeWS: (id, code) => {
    
            WSsockets[id]['socket'].close(code)
    
        }
    },
    UDP: {
        sendPointer: (id, event, pointer) => {

            if (!UDPsockets[id]) return
    
            UDPsockets[id]['pointers'][wasmModule.exports.__getString(event).toLowerCase().trim()] = wasmModule.exports.table.get(pointer)
    
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
                socket: dgram.createSocket(`udp${type}`)
            })
    
            let id = UDPsockets.length - 1
    
            let socket = UDPsockets[id]
    
            socket.socket.on('message', (data, info) => {

                const messagePtr = wasmModule.exports.__newString(data.toString('utf8'))
    
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
    
            UDPsockets[id]['socket'].send(Buffer.from(wasmModule.exports.__getArray(message)), port, wasmModule.exports.__getString(address))
    
            return
    
        },
        closeUDP: (id) => {
    
            UDPsockets[id]['socket'].close()
    
        },
        bindUDP: (id, port, address) => {
    
            UDPsockets[id]['socket'].bind(port, wasmModule.exports.__getString(address))
    
        }
    },
    HTTP: {
        getHTTP: (url, callback) => {

            const func = wasmModule.exports.table.get(callback)

            const fetched = fetch({
                url: wasmModule.exports.__getString(url),
                method: 'GET'
            }).then((res) => {

                res.text().then((body) => {

                    func(wasmModule.exports.__newString(body))
                    
                })

            })
        }
    }
}

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports)

module.exports = wasmModule.exports

wasmModule.exports.test()