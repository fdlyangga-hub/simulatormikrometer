document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("micrometerSlider");
    const angkaHasil = document.getElementById("angkaHasil");
    const movingPart = document.getElementById("movingPart");
    const sleeveScale = document.getElementById("sleeveScaleContainer");
    const thimbleScale = document.getElementById("thimbleScaleContainer");

    const pxPerMm = 8; // 1mm = 8 pixel

    // 1. Gambar Skala Utama (Sleeve)
    let sleeveHTML = "";
    for (let i = 0; i <= 25; i++) {
        let x = 330 + (i * pxPerMm);
        sleeveHTML += `<line x1="${x}" y1="118" x2="${x}" y2="130" stroke="black" stroke-width="1"/>`;
        if (i % 5 === 0) {
            sleeveHTML += `<text x="${x-3}" y="115" font-size="10" font-family="Arial" font-weight="bold">${i}</text>`;
        }
        if (i < 25) {
            let xHalf = x + (pxPerMm / 2);
            sleeveHTML += `<line x1="${xHalf}" y1="130" x2="${xHalf}" y2="140" stroke="black" stroke-width="0.8"/>`;
        }
    }
    sleeveScale.innerHTML = sleeveHTML;

    // 2. Gambar Skala Nonius (Thimble)
    let thimbleHTML = "";
    for (let i = -50; i < 100; i++) {
        let val = Math.abs(i % 50);
        let y = 45 - (i * 4); // Jarak vertikal antar angka
        let isMajor = val % 5 === 0;
        thimbleHTML += `<line x1="2" y1="${y}" x2="${isMajor ? 20 : 12}" y2="${y}" stroke="black" stroke-width="1"/>`;
        if (isMajor) {
            thimbleHTML += `<text x="25" y="${y+4}" font-size="10" font-family="Arial">${val}</text>`;
        }
    }
    thimbleScale.innerHTML = thimbleHTML;

    // 3. Update Pergerakan
    slider.addEventListener("input", function() {
        const val = parseFloat(this.value);
        angkaHasil.innerText = val.toFixed(2);

        // Geser Thimble
        const moveX = val * pxPerMm;
        movingPart.setAttribute("transform", `translate(${moveX}, 0)`);

        // Putar Skala (0.5mm = 1 putaran = 200px)
        const rotateY = (val % 0.5) / 0.5 * 200;
        thimbleScale.setAttribute("transform", `translate(0, ${rotateY})`);
    });
});

// Fungsi Latihan Soal
function cekNilai() {
    let score = 0;
    for (let i = 1; i <= 5; i++) {
        let q = document.querySelector(`input[name="q${i}"]:checked`);
        if (q && q.value === "1") score += 20;
    }
    const res = document.getElementById("skor");
    res.style.display = "block";
    res.innerHTML = `Skor: ${score} | ${score >= 75 ? "LULUS" : "REMIDI"}`;
    res.style.color = score >= 75 ? "#2e7d32" : "#c62828";
}