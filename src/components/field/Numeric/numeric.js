import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: Number,
      default: 0
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return { 
      input: {
        el: null,
        value: '',
        rule: { type: ['number'] },
        visible: false
      },
      configuration: {
        shared: [
          { propertie: 'min', init: -250, required: true },
          { propertie: 'max', init: 250, required: true },
          { propertie: 'step', init: '0.01', required: false }
        ],
        types: {
          init: 'number',
          value: ['number']
        }
      }
    }
  },
  methods: {
    setElement(element, type) {
      switch (type) {
        case 'input': 
          this.input.el = element;
          this.loadConfig()
          break;
      }
    },

    loadConfig() {
      let { ...args } = this.shared

      for(let config of this.configuration.shared) {
        let { propertie, init, required } = config

        if (typeof args[propertie] === 'undefined') {
          if (required) this.input.el[propertie] = init
          continue
        } else {
          this.input.el[propertie] = args[propertie]
        }
      }
    },

    passwordVisibleChange(event) {
      this.input.visible = !this.input.visible

      if (this.input.visible)
        this.input.rule.type.push('text')
      else
        this.input.rule.type.splice(1, 1)
    },

    set() {
      this.input.value = this.value || ''
    },

    get() {
      return this.input.value
    }
  },
  computed: {
    type() {
      return (this.input.rule.type.length > 1) ? this.input.rule.type[1] : this.input.rule.type[0]
    }
  }
}