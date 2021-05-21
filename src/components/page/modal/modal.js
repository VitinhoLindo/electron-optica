import BaseMixin from '../../mixins/js/base'

export default {
  name: 'modal-page',
  mixins: [BaseMixin],
  data() {
    return {
      on: false,
      show: false,
      component: {
        name: '',
        data: null
      }
    }
  },
  methods: {
    listen({ name, data, on = false, show = false }) {
      this.set('name', name)
      this.set('data', data)
      this.set('on', on)
      this.set('show', show)
    },

    set(field, value) {
      switch (field) {
        case 'name':
        case 'data':
          this.component[field] = value;  break
        case 'on'  :
        case 'show':
          this.component[field] = value; break
      }
    },

    load() {
      this.$app.on('modal', this.listen)
    }
  },
}