export default {
  created() {
    let rules = [
      { func: 'get', call: 'getters' },
      { func: 'load', call: 'load' },
      { func: 'set', call: 'set' },
    ]

    this.init(rules)
  },

  mounted() {
    let rules = [ { func: 'build', call: 'build' } ]

    this.init(rules)
  },

  methods: {
    init(rules) {
      for(let rule of rules) {
        if (typeof this[rule.func] !== 'function') continue
        if (typeof this[rule.call] !== 'function') continue
  
        this[rule.call]()
      }
    }
  }
}