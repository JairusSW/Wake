const ChildProcess = require('child_process')

ChildProcess.exec('node --help', (error, stdout, stderr) => {

    console.log(stdout)
    
})