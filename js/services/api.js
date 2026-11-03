const DataService = {
  async load() {
    const response = await fetch('data/dataBahanAjar.json');
    if (!response.ok) throw new Error('Data bahan ajar tidak dapat dimuat.');
    return response.json();
  }
};
