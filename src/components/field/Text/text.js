import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: String,
      default: ''
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
        rule: { type: [] },
        visible: false
      },
      configuration: {
        shared: [
          // { propertie: 'type', init: 'text', required: true },
          // { propertie: 'min', init: 0, required: false },
          // { propertie: 'max', init: 250, required: false },
          { propertie: 'maxLength', init: 400, required: false },
        ],
        types: {
          init: 'text',
          value: ['text', 'email', 'password']
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

    // 
    load() {
      let { type, ...args } = this.shared

      if (this.configuration.types.value.indexOf(type) < 0)
        type = this.configuration.types.init
      this.input.rule.type.push(type)
    },

    loadConfig() {
      let { type, ...args } = this.shared

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
    },
    password() {
      return this.input.rule.type[0] === 'password'
    }
  }
}