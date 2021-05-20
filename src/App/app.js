import Data from './data.json'

export default {
  name: 'App',
  data() {
    return {
      viewMode: 'form',
      fields: [
        // { name: 'text-field', label: 'nome', field: 'name', value: 'Teste-valor', shared: { type: 'email' } },
        // { name: 'numeric-field', label: 'idade', field: 'age', value: 5, shared: {  } },
        { name: 'file-field', label: 'file', field: 'file', value: Data, shared: {  } }
      ],
      getters: {}
    }
  },
  methods: {
    set(getter, index) {
      let { field } = this.fields[index]

      this.getters[field] = getter
    },
    get() {
      let json = {}

      for(let field of this.getters) json[field] = this.getters[field]()
      return json
    }
  }
}