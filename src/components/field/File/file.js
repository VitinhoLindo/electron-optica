import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'file-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: [Object,Array],
      default: []
    },
    shared: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      _value_: [],
      _shared_: {
        multiple: false,
        accept: '*'
      },
      input: null
    }
  },
  methods: {
    onDrag({ event, type }) {
      switch (type) {
        case 'drag-over':
          event.preventDefault(); break;     
        case 'drag-drop':
        case 'drag-enter':
        case 'drag-leave': 
        default: break;
      }
    },

    setElement(el, name) {
      switch (name) {
        case 'input': break;
        case 'files': break;
        default: console.warn(`setElement: don\'t defined name ${name}`); break;
      }
    },

    load() {
      this.setValue()
      let { multiple, accept } = this.shared || {}
      this._shared_ = {
        multiple: multiple || true,
        accept: accept || '*'
      }
    },

    async setValue() {
      let files = []

      if (typeof this.value === 'object' && !(this.value instanceof Array))
        files.push(this.value)
      else if (typeof this.value === 'object' && this.value instanceof Array)
        files = files.concat(this.value)
      
      for(let index in files) {
        files[index] = this.set(files[index])
      }

      this._value_ = await Promise.all(files)
    },

    build() { },
    
    remove(event, index) {
      this._value_.splice(index, 1);
    },

    async dropEnterFile() {

    },

    async setFilesAsync(event = new Event()) {
      let files  = event.target.files
      if (files === null) { return }      
      let fileReader = this.$app.fileReader()

      fileReader.on('success', (data) => { this._value_.push(data) })
      fileReader.on('error', function(data) { console.error('error in read file: ', data.name) })

      fileReader.readFiles(files)
      event.target.files = null
    },

    async inputClick(event = new MouseEvent()) {
      event.preventDefault()

      if (this.input.el == null) for(let x = 0; x < 2; x++) {
        if (this.input.el != null) break
        this.input.el = await this.getElement(this.input.id)
      }

      if (this.input.el != null) this.input.el.click()
    },

    async set(file) {
      let fileReader = this.$app.fileReader()

      return {
        name: file.name,
        type: file.type,
        size: {
          value: file.size,
          src: {
            b: fileReader.binaryInfo.format(file.size, { unit: 'b' }),
            mb: fileReader.binaryInfo.format(file.size, { unit: 'mb' }),
            gb: fileReader.binaryInfo.format(file.size, { unit: 'gb' })
          }
        },
        modified: file.modified,
        data: {
          format: file.data.format,
          value: file.data.value,
          src: fileReader.getSrc({ buffer: this.$app.toBuffer(file.data.value, file.data.format), mime: file.type })
        }
      }
    },

    get() { 
      let files = this._value_.map(function (file, index, array) {
        return {
          name: file.name,
          size: file.size.value,
          type: file.type,
          modified: file.lastModified,
          data: {
            format: file.data.format,
            value: file.data.value
          }
        }
      }), len = files.length

      if (len == 1)     return files[0]
      else if (len > 1) return files
      else              return null
    }
  }
}