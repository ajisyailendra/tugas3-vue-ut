Vue.component("ba-stock-table", {
  props: ["items", "upbjjList", "kategoriList"],
  data: () => ({
    filters: { upbjj: "", kategori: "", low: false, sort: "judul" },
    editing: null,
    form: null,
    showForm: false,
    note: "",
  }),
  computed: {
    categoryOptions() {
      const area = this.filters.upbjj;
      return [
        ...new Set(
          this.items
            .filter((x) => !area || x.upbjj === area)
            .map((x) => x.kategori),
        ),
      ];
    },
    filteredItems() {
      let rows = this.items.filter(
        (x) =>
          (!this.filters.upbjj || x.upbjj === this.filters.upbjj) &&
          (!this.filters.kategori || x.kategori === this.filters.kategori) &&
          (!this.filters.low || Number(x.qty) < Number(x.safety)),
      );
      const key = this.filters.sort;
      return rows
        .slice()
        .sort((a, b) =>
          key === "judul"
            ? a.judul.localeCompare(b.judul, "id")
            : Number(a[key]) - Number(b[key]),
        );
    },
    summary() {
      return {
        total: this.items.length,
        low: this.items.filter((x) => x.qty < x.safety).length,
        safe: this.items.filter((x) => x.qty >= x.safety).length,
      };
    },
  },
  watch: {
    "filters.upbjj"() {
      this.filters.kategori = "";
    },
    filters: {
      deep: true,
      handler() {
        this.note = "";
      },
    },
  },
  methods: {
    rupiah: (n) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n),
    formatInputHarga(value) {
      const angka = String(value ?? "").replace(/\D/g, "");
      return angka ? angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    },
    setHarga(event) {
      this.form.harga = event.target.value.replace(/\D/g, "");
    },
    reset() {
      this.filters = { upbjj: "", kategori: "", low: false, sort: "judul" };
    },
    blank() {
      return {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: "",
        catatanHTML: "",
      };
    },
    add() {
      this.editing = null;
      this.form = this.blank();
      this.showForm = true;
    },
    plainText(value) {
      const temp = document.createElement("div");
      temp.innerHTML = value || "";
      return temp.textContent || temp.innerText || "";
    },
    edit(item) {
      this.editing = item;
      this.form = { ...item, catatanHTML: this.plainText(item.catatanHTML) };
      this.showForm = true;
    },
    submit() {
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj ||
        !this.form.lokasiRak ||
        this.form.harga === "" ||
        this.form.qty === "" ||
        this.form.safety === ""
      ) {
        this.note = "Lengkapi seluruh data yang wajib diisi.";
        return;
      }
      const item = {
        ...this.form,
        harga: Number(this.form.harga),
        qty: Number(this.form.qty),
        safety: Number(this.form.safety),
      };
      if (!this.editing && this.items.some((x) => x.kode === item.kode)) {
        this.note = "Kode mata kuliah sudah digunakan.";
        return;
      }
      this.$emit("save", item);
      this.showForm = false;
      this.note = "";
    },
    enterSave(e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") this.submit();
    },
  },
  template: "#tpl-stock",
});
