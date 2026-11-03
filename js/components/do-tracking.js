Vue.component('do-tracking', {
  props: ['orders'], data: () => ({ query:'', progressFor:null, progressText:'' }),
  computed: { results() { const q=this.query.trim().toLowerCase(); return !q ? this.orders : this.orders.filter(x=>x.nomor.toLowerCase().includes(q)||x.nim.includes(q)); } },
  methods: { date(value) { return new Intl.DateTimeFormat('id-ID',{dateStyle:'long'}).format(new Date(value+'T12:00:00')); }, rupiah:n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n), clear(e){ if(e.key==='Escape')this.query=''; }, openProgress(order){this.progressFor=order;this.progressText='';}, closeProgress(){this.progressFor=null;this.progressText='';}, submitProgress(){ if(!this.progressText.trim())return;this.$emit('add-progress',{order:this.progressFor,text:this.progressText.trim()});this.closeProgress();} }, template:'#tpl-tracking'
});
