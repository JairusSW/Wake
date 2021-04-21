const ffmpeg = require('fluent-ffmpeg')

const Speaker = require('speaker')

const speaker = new Speaker()

const speaker2 = new Speaker()

const fs = require('fs')
const { Readable } = require('stream')

const file = fs.readFileSync('./audio.mp3')
const fileStream = fs.createReadStream('./audio.mp3')

const stream = ffmpeg(fileStream).toFormat('s16le').pipe()

stream.pipe(speaker)