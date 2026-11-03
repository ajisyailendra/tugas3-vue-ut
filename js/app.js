(async function boot() {
  const templateFiles = ['stock-table.html', 'do-tracking.html', 'order-form.html'];
  await Promise.all(templateFiles.map(async file => {
    const template = await fetch(`templates/${file}`).then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', template);
  }));
  new Vue({
  el: '#app',
  data: { tab: 'stok', sidebarOpen: false, successMessage: '', successTimer: null, state: { stok: [], tracking: [], paket: [], upbjjList: [], kategoriList: [], pengirimanList: [] } },
  computed: { pageTitle() { return { stok: 'Stok bahan ajar', tracking: 'Tracking delivery order', order: 'Buat pengiriman baru' }[this.tab]; } },
  async created() { try { this.state = await DataService.load(); const savedStok=localStorage.getItem('baku-stok'); const savedTracking=localStorage.getItem('baku-tracking'); if(savedStok) this.state.stok=JSON.parse(savedStok); if(savedTracking) this.state.tracking=JSON.parse(savedTracking); } catch (error) { alert(error.message); } },
  watch: {
    'state.stok': { deep: true, handler(value) { localStorage.setItem('baku-stok', JSON.stringify(value)); } },
    'state.tracking': { deep: true, handler(value) { localStorage.setItem('baku-tracking', JSON.stringify(value)); } }
  },
  methods: {
    showSuccess(message) { clearTimeout(this.successTimer); this.successMessage=message; this.successTimer=setTimeout(()=>{this.successMessage='';},3000); },
    saveStock(item) { const index=this.state.stok.findIndex(x=>x.kode===item.kode); if(index>-1) { this.$set(this.state.stok,index,item); this.showSuccess('Data bahan ajar berhasil diperbarui.'); } else { this.state.stok.push(item); this.showSuccess('Bahan ajar berhasil ditambahkan.'); } },
    askRemove(item) { this.$refs.modal.confirm('Hapus bahan ajar?', `Data ${item.kode} - ${item.judul} akan dihapus dari daftar stok.`, () => { this.state.stok=this.state.stok.filter(x=>x!==item); }); },
    createOrder(order) { this.state.tracking.unshift(order); this.tab='tracking'; this.showSuccess('Delivery order berhasil dibuat.'); },
    addProgress({ order, text }) { order.perjalanan.push({ waktu: new Date().toLocaleString('sv-SE').replace('T',' '), keterangan: text }); order.status='Dalam Perjalanan'; this.showSuccess('Pembaruan perjalanan berhasil disimpan.'); }
  }
  });
})();
