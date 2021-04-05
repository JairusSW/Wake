const fs = require("fs");
const loader = require('@assemblyscript/loader');

const Wake = require('./bind')

const wake = new Wake()

const imports = {
    ...wake.wasmImports
}

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports)

wake.wasmExports = wasmModule.exports

module.exports = wasmModule.exports

wasmModule.exports.test()