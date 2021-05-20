export default {
  props: {
    mode: {
      type: String,
      default: 'view'
    },
    label: {
      type: String,
      required: true,
    },
    getter: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      draggable: {
        class: [],
        drag: null,
        
      }
    }
  },
  created() {
    if (typeof this.get === 'function')
      this.getter(this.get)
    if (typeof this.load === 'function')
      this.load()
  },
  mounted() {
    if (typeof this.build === 'function')
      this.build()
  },
  methods: {
    sleep(time) {
      time = parseFloat(time) || 1
      time *= 1000

      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(true)
        }, time)
      })
    },
    
    async getElement(id, args) {
      let { trying = 20, time = 0.1 } = args || {}
      let element = null, 
          count = 0

      while(element == null) {
        if (count === trying) break

        element = document.getElementById(id)
        await this.sleep(time)
        count++
      }

      return element
    },


  },
}