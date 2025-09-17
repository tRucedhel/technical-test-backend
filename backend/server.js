const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let simpanData = [];

app.get('/', (req, res) => {
  res.status(200).send('<h1>Server Backend Sedang Aktif!</h1><p>Gunakan endpoint /api/data untuk berinteraksi dengan data.</p>');
});

console.log("Server sedang disiapkan...");

app.get('/api/data', (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /api/data - Mengirim ${simpanData.length} data.`);
    res.status(200).json({
        message: "Data berhasil diambil",
        data: simpanData
    });
});

app.post('/api/data', (req, res) => {
    const { nama, email, pesan } = req.body;

    if (!nama || !email || !pesan) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    const dataBaru ={
        id: simpanData.length + 1,
        nama,
        email,
        pesan,
        tanggal: new Date().toISOString()
    }

    simpanData.push(dataBaru);

    console.log(`[${dataBaru.tanggal}] POST /api/data - Data baru ditambahkan dari ${nama}. Total data saat ini : ${simpanData.length}.`);
    res.status(201).json({
        message: "Data berhasil disimpan",
        data: dataBaru
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
