module.exports = `
    const fss = require('fs')

    this['FS'] = {
        FS: {
            fsWriteFileSync: (path, data) => {
    
                fss.writeFileSync(wasmModule.exports.__getString(path), Uint8Array.from(wasmModule.exports.__getArray(data)))
    
            },
            fsReadFileSync: (path) => {
    
                const array = fss.readFileSync(wasmModule.exports.__getString(path))
    
                // TODO: Check in with @battagline
    
                return wasmModule.exports.__newArray(3, array)
    
            },
            fsMkDirSync: (path) => {
    
                fss.mkdirSync(wasmModule.exports.__getString(path))
    
            },
            fsAppendFileSync: (path, data) => {
    
                fss.appendFileSync(wasmModule.exports.__getString(path), Uint8Array.from(wasmModule.exports.__getArray(data)))
    
            },
            fsExistsSync: (path) => {
    
                return fss.existsSync(wasmModule.exports.__getString(path)) ? 1 : 0
    
            },
        }
    }
`