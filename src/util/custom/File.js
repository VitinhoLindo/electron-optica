import BinaryInfo from './BinaryInfo'
import MyEvent from '../Event'
import { Base } from '../index'

export default class CustomFileReader extends MyEvent {
  constructor(main = new Base()) {
    super()

    this._main_ = main
    this.binaryInfo = new BinaryInfo()
  }

  _getBaseInfo(file = new File([], '')) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
  }

  _getSrc(args) {
    let { buffer, mime } = args || {},
      base64 = this._main_.bufferToBase64(buffer)

    if (/image\/.+/g.test(mime))      return `data:${mime};base64, ${base64}`;
    else if (/audio\/.+/g.test(mime)) return this._main_.db.base64.value.audio.src;
    else if (/video\/.+/g.test(mime)) return this._main_.db.base64.value.video.src;
    else                              return this._main_.db.base64.value.file.src;
  }

  listen(func) {
    this.on('file-reader', func)
  }

  emitEvent(data) {
    this.emit('file-reader', data)
  }

  getPercent(event = new ProgressEvent('')) {
    let percent = Math.round((event.loaded / event.total) * 100)
    return {
      numeric: percent,
      text: `${percent}%`
    } 
  }

  async readToEvents(fileReader = new FileReader(), info, encoding, src) {
    fileReader.onerror = (event) => this.emitEvent({ event, type: 'error', error: event.target.error, file: info })
    fileReader.onload  = (event) => this.emitEvent({ event, type: 'start', file: info })
    fileReader.onprogress = (event) => this.emitEvent({ event, type: 'progress', file: ((info.percent = this.getPercent(event)) && (info)) })
    fileReader.onabort = (event) => this.emitEvent({ event, type: 'abort', file: info })
    fileReader.onloadend = (event) => {
      let buffer = event.target.result

      if ('percent' in info) delete info.percent
      info.data = this._main_.bufferTo(buffer, encoding)
      if (src) info.src = this._getSrc({ buffer, mime: info.type })

      this.emitEvent({ event, type: 'end', file: info })
    }
  }

  async readFile(file, options) {
    let { encoding = 'hex', src = false } = options || {}

    if (typeof encoding === 'undefined')
      encoding = 'hex'
    if (['hex', 'base64', 'utf-8'].indexOf(encoding) < 0) 
      encoding = 'hex'
    let info = this._getBaseInfo(file),
        fileReader = new FileReader()

    this.readToEvents(fileReader, info, encoding, src)
    fileReader.readAsArrayBuffer(file)
  }

  async readFiles(files = [], args) {
    for(let file of files)
      await this.readFile(file, args)
  }
}