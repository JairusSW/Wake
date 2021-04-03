const fs = require("fs");
const loader = require('@assemblyscript/loader');

// Imports

const toImport = require('./imports/all')

let WSsockets = []

const ws = require('ws')

const ChildProcess = require('child_process')
const fss = require('fs')
let UDPsockets = []
const dgramUDP = require('dgram')

// HTTP

const { fetch } = require('cross-fetch')

const Wake = require('./bind')

const wake = new Wake()

const imports = {
    ...wake.wasmImports
}

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports)

wake.wasmExports = wasmModule.exports

module.exports = wasmModule.exports

wasmModule.exports.test()