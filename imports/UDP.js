module.exports = `
    let UDPsockets = []

    const dgramUDP = require('dgram');

    this['UDP'] = {
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
                    socket: dgramUDP.createSocket('udp' + type + '')
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
        }
    }
`