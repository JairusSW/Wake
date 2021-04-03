module.exports = `
    const ChildProcess = require('child_process')
    const fss = require('fs')
    let UDPsockets = []
    const dgramUDP = require('dgram')
    this{
    ChildProcess: {
        ExecSync: (command) => {
            return this.__newString(ChildProcess.execSync(this.__getString(command)).toString())
        }
    },
    FS: {
        fsWriteFileSync: (path, data) => {

            fss.writeFileSync(this.__getString(path), Uint8Array.from(this.__getArray(data)))

        },
        fsReadFileSync: (path) => {

            const array = fss.readFileSync(this.__getString(path))

            // TODO: Check in with @battagline

            return this.__newArray(3, array)

        },
        fsMkDirSync: (path) => {

            fss.mkdirSync(this.__getString(path))

        },
        fsAppendFileSync: (path, data) => {

            fss.appendFileSync(this.__getString(path), Uint8Array.from(this.__getArray(data)))

        },
        fsExistsSync: (path) => {

            return fss.existsSync(this.__getString(path)) ? 1 : 0

        }
    },
    UDP: {
        sendPointer: (id, event, pointer) => {

            if (!UDPsockets[id]) return

            UDPsockets[id]['pointers'][this.__getString(event).toLowerCase().trim()] = this.table.get(pointer)

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

                const messagePtr = this.__newString(data.toString('utf8'))

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

            UDPsockets[id]['socket'].send(Buffer.from(this.__getArray(message)), port, this.__getString(address))

            return

        },
        closeUDP: (id) => {

            UDPsockets[id]['socket'].close()

        },
        bindUDP: (id, port, address) => {

            UDPsockets[id]['socket'].bind(port, this.__getString(address))

        }
    },
    Console: {
        consoleDebug: (message) => {

            console.debug(this.__getString(message))

        },
        consoleError: (message) => {

            console.error(this.__getString(message))

        },
        consoleInfo: (message) => {

            console.info(this.__getString(message))

        },
        consoleTime: (label) => {

            console.time(this.__getString(label))

        },
        consoleTimeEnd: (label) => {

            console.timeEnd(this.__getString(label))

        },
        consoleTimeLog: (label) => {

            console.timeLog(this.__getString(label))

        },
        consoleWarn: (message) => {

            console.warn(this.__getString(message))

        },
        consoleLog: (message) => {

            console.log(this.__getString(message))

        }
    }
}`