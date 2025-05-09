let senaraiIC = [];

fetch('anggota.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    // Padamkan tanda '-' dari semua IC
    senaraiIC = json
      .map(row => row['KP Baru'])
      .filter(kp => typeof kp === 'string')
      .map(kp => kp.replace(/-/g, '').trim());
  });

function semakIC() {
  const ic = document.getElementById("icInput").value.replace(/-/g, '').trim();
  const result = document.getElementById("result");

  if (!ic) {
    result.textContent = "Sila masukkan nombor kad pengenalan.";
    return;
  }

  if (senaraiIC.includes(ic)) {
    result.textContent = "✅ Anda SUDAH berdaftar sebagai ahli koperasi.";
  } else {
    result.textContent = "❌ Anda BELUM berdaftar sebagai ahli koperasi.";
  }
}
