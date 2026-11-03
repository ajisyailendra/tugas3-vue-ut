Vue.component("order-form", {
  props: ["paket", "pengirimanList"],
  data: () => ({
    form: {
      nim: "",
      nama: "",
      ekspedisi: "",
      paket: "",
      tanggal: new Date().toISOString().slice(0, 10),
    },
    error: "",
  }),
  computed: {
    selected() {
      return this.paket.find((x) => x.kode === this.form.paket);
    },
    generated() {
      const sequence = this.$root.state.tracking.length + 1;
      return `DO${new Date().getFullYear()}-${String(sequence).padStart(3, "0")}`;
    },
    total() {
      return this.selected ? this.selected.harga : 0;
    },
  },
  methods: {
    rupiah: (n) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n),
    date(v) {
      return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
        new Date(v + "T12:00:00"),
      );
    },
    submit() {
      if (
        !this.form.nim ||
        !this.form.nama ||
        !this.form.ekspedisi ||
        !this.form.paket ||
        !this.form.tanggal
      ) {
        this.error = "Mohon lengkapi semua data pengiriman.";
        return;
      }
      this.$emit("create-order", {
        nomor: this.generated,
        nim: this.form.nim,
        nama: this.form.nama,
        ekspedisi: this.form.ekspedisi,
        tanggalKirim: this.form.tanggal,
        paket: this.form.paket,
        total: this.total,
        status: "Disiapkan",
        perjalanan: [
          {
            waktu: new Date().toLocaleString("sv-SE").replace("T", " "),
            keterangan: "Order berhasil dibuat dan menunggu penjemputan",
          },
        ],
      });
    },
  },
  template: "#tpl-order",
});
