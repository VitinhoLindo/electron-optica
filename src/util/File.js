import BinaryInfo from './BinaryInfo'
import MyEvent from './Event'

export default class CustomFileReader extends MyEvent {
  constructor(main) {
    super()

    this._main_ = main
    this.data = main.data
    this.binaryInfo = new BinaryInfo()
  }

  getSrc(args) {
    let { buffer, mime } = args || {}
    let base64 = this._main_.bufferToBase64(buffer)

    if (/image\/.+/g.test(mime)) return `data:${mime};base64, ${base64}`;
    else if (/audio\/.+/g.test(mime)) return this.data.base64.audio.data;
    else if (/video\/.+/g.test(mime)) return this.data.base64.video.data;
    else return this.data.base64.file.data
  }

  readerFileToCallback(reader = new FileReader(), info, callback) {
    reader.onloadend = function (event) {
      return callback(null, event.target.result)
    }
  
    reader.onerror = function () {
      return callback(info, null)
    }
  }
  
  readFile(file = new File(), encoding) {
    return new Promise((resolve, reject) => {
      let info = {
        name: file.name,
        size: {
          value: file.size,
          src: {
            b: this.binaryInfo.format(file.size, { unit: 'b' }),
            mb:  this.binaryInfo.format(file.size, { unit: 'mb' }),
            gb: this.binaryInfo.format(file.size, { unit: 'gb' })
          }
        },
        type: file.type,
        modified: file.modified
      }, reader = new FileReader()
  
      this.readerFileToCallback(reader, info, (err, result) => {
        if (err) {
          this.emit('error', err)
          return reject(err)
        }

        info.data = {
          src: this.getSrc({ buffer: result, mime: info.type }),
          ...this._main_.bufferTo(result, encoding)
        }
        this.emit('success', info)
  
        return resolve(info)
      });

      reader.readAsArrayBuffer(file)
    });
  }
  
  async readFiles(files = [], args) {
    let { encoding = 'hex' } = args || {},
        readed = []
  
    for(let file of files)
      readed.push(this.readFile(file, encoding))
  
    return await Promise.all(readed)
  }
}