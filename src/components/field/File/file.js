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
      input: {
        el: null,
        value: [],
        rules: { multiple: true, accept: '*' },
        class: { init: ['upload'], append: [] },
        progress: false
      }
    }
  },
  methods: {
    load() {
      let { multiple, accept } = this.shared || {}

      this.input.rules = {
        multiple: multiple || true,
        accept: accept || 'image/*'
      }
    },

    setElement(element, type) {
      switch (type) {
        case 'input': this.input.el = element; break;
      }
    },

    uploadButtonClass(type, value) {
      let index = this.input.class.append.indexOf(value)

      if (type == 'set') 
        this.input.class.append.push(value)
      if (type == 'unset') {
        if (index < 0) return
        this.input.class.append.splice(index, 1)
      }
    },

    progressUpload(bool) {
      this.input.progress = bool
      this.uploadButtonClass(bool ? 'set': 'unset', 'disabled')
    },

    async inputFileChange(event = new Event()) {
      this.progressUpload(true)
      let values = event.target.files,
        files = []

      for(let file of (values || []))
        files.push(file)

      await this.addFiles(files)
      this.progressUpload(false)
      event.target.files = null
    },

    getFileIndex(name, type) {
      for(let index in this.input.value) {
        let file = this.input.value[index]

        if (file.name == name && file.type == type) return index
      }
      return -1
    },

    getFile(name, type) {
      let index = this.getFileIndex()

      if (index < 0) return null
      else           return this.input.value[index]
    },

    setFile(file) {
      let index = this.getFileIndex(file.name, file.type)

      if (index >= 0) this.input.value.splice(index, 1)
      this.input.value.push(file)
    },

    listenFileChange({ event, type, file, error }) {
      switch (type) {
        case 'end':
        case 'progress': this.setFile(file); break;
        default:                             break;
      }
    },

    async addFiles(files) {
      let fileReader = this.$app.fileReader()

      fileReader.listen(this.listenFileChange)
      await fileReader.readFiles(files, { encoding: 'hex', src: false })
    },

    inputFilesClick(event = new MouseEvent()) {
      if (this.input.el == null) return
      this.input.el.click()
    },

    removeFile(event, index) {
      this.input.value.splice(index, 1)
    },

    set() {
      if (this.value === null) return
      this.input.value = (typeof this.value === 'object' && this.value instanceof Array) ?
        this.value:
        [this.value]
    },

    get() {
      return this.input.value
    }
  },
  computed: {
    uploadClass() {
      let { init, append } = this.input.class
      return init.concat(append)
    }
  }
}