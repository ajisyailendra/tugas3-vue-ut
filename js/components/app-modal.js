Vue.component('app-modal', {
  data: () => ({ open: false, title: '', message: '', action: null }),
  methods: { confirm(title, message, action) { this.title=title; this.message=message; this.action=action; this.open=true; }, close() { this.open=false; }, proceed() { if (this.action) this.action(); this.close(); } },
  template: '<div v-if="open" class="modal-backdrop"><div class="modal" role="dialog"><div class="modal-icon">!</div><h2>{{ title }}</h2><p>{{ message }}</p><div class="modal-actions"><button class="btn ghost" @click="close">Batal</button><button class="btn danger" @click="proceed">Ya, hapus</button></div></div></div>'
});
