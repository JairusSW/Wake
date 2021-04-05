# Wake 🌊
**NodeJS bindings for AssemblyScript**

## About

WAKE is a set of bindings to NodeJS modules such as FileSystem, UDP, WebSocket, Console, and more. We try to bring as much of the NodeJS features and modules to AssemblyScript and make them as fast as possible. 🚀

## Features
- FileSystem Access 💾
- Supports Networking ⚡
- Access the console 💬
- Streams support 💧
- Http client 📨
- UDP Sockets 🌠
- Worker Support 🔥
- Child Process 🌓
- Console Access 📝
- EventEmitters 🍻
## Installation

```bash
~ npm install as-wake
```

## Usage

### Console

```js

import { console } from 'as-wake'

console.log('Hello from AssemblyScript! 🚀')

console.warn('WARN: Wake is amazing! 🌊')

```

### FileSystem

```js
import { fs, console } from 'as-wake'

fs.writeFileSync('./test.txt', Uint8Array.wrap(String.UTF8.encode('Hello from AssemblyScript! 🚀')))

console.log(String.UTF8.decode(fs.readFileSync('./test.txt').buffer))
```

### EventEmitter

```js
import { EventEmitter, console } from 'as-wake'

const emitter = new EventEmitter()

emitter.on('message', (message) => {

    console.log('Recieved Message: ' + message)

})

emitter.emit('message', 'Hello from AssemblyScript! 🚀')
```

### UDP Socket

```js
import { UDPSocket } from 'as-wake'

const socket = new UDPSocket('udp4')

socket.on('message', (message) => {

    console.log('Recieved Message: ' + message)

})

socket.bind(3000, '0.0.0.0')

socket.send('Hello from AssemblyScript! 🚀', 3000, 'localhost')
```

### WebSocket

```js
import { WebSocket } from 'as-wake'

const socket = new WebSocket('wss://echo.websocket.org/')

socket.on('message', (message) => {

    console.log('Recieved Message: ' + message)

})

socket.send('Hello from AssemblyScript! 🚀')
```

### HTTP

```js
import { http, console } from 'as-wake'

http.get('https://catfact.ninja/fact', (body) => {

    console.log(body)

})
```

### ChildProcess

```js
import { ChildProcess, console } from 'as-wake'

console.log(ChildProcess.execute('node --help'))
```