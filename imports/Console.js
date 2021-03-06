module.exports = `
    this['Console'] = {
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
        }
    }
`