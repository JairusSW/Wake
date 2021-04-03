module.exports = `
    const ChildProcess = require('child_process')
    this['ChildProcess'] = {
        ChildProcess: {
            ExecSync: (command) => {
                return wasmModule.exports.__newString(ChildProcess.execSync(wasmModule.exports.__getString(command)).toString())
            }
        }
    }
`