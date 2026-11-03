Vue.component('status-badge', {
  props: ['qty', 'safety'],
  computed: { label() { return Number(this.qty) === 0 ? 'Kosong' : Number(this.qty) < Number(this.safety) ? 'Menipis' : 'Aman'; } },
  template: '<span class="status-badge" :class="label.toLowerCase()">{{ label }}</span>'
});
