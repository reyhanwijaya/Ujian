// Variabel dan elemen DOM
const startButton = document.getElementById('start-btn');
const qrScanButton = document.getElementById('qr-scan-btn');
const closeQrButton = document.getElementById('close-qr-btn');
const inputContainer = document.getElementById('input-container');
const proctorContainer = document.getElementById('proctor-container');
const qrContainer = document.getElementById('qr-container');
const proctorFrame = document.getElementById('proctor-frame');
const linkInput = document.getElementById('link-input');
const qrVideo = document.getElementById('qr-video');

let proctoringStarted = false; // Flag untuk mengecek apakah proctoring sudah dimulai

startButton.addEventListener('click', startProctoring);
qrScanButton.addEventListener('click', startQrScanning);
closeQrButton.addEventListener('click', closeQrScanner);

function startProctoring() {
    const link = linkInput.value.trim();
    if (link) {
        inputContainer.classList.add('hide');
        proctorContainer.classList.remove('hide');
        proctorFrame.src = link;
        proctorFrame.style.display = 'block';

        openFullscreen(); // fullscreen hanya di sini
    } else {
        alert('Masukkan link terlebih dahulu!');
    }
}

function startQrScanning() {
    inputContainer.classList.add('hide');
    qrContainer.classList.remove('hide');

    const qrScanner = new QrScanner(
        qrVideo,
        result => {
            qrScanner.stop();
            linkInput.value = result.data;

            qrContainer.classList.add('hide');
            inputContainer.classList.remove('hide');
        }
    );

    qrScanner.start().then(() => {
        console.log("Kamera aktif");
    }).catch(err => {
        console.error("Kamera error:", err);
        alert("Kamera tidak bisa diakses. Pastikan izin kamera aktif.");
    });
}

function closeQrScanner() {
    qrContainer.classList.add('hide');
    inputContainer.classList.remove('hide');
}

function openLink(link) {
    inputContainer.classList.add('hide');
    qrContainer.classList.add('hide');
    proctorContainer.classList.remove('hide');
    proctorFrame.src = link;
    proctorFrame.style.display = 'block';

    // Panggil fullscreen secara langsung setelah QR code berhasil di-scan
    openFullscreen();
    proctoringStarted = true;
}

function openFullscreen() {
    const elem = proctorContainer; 
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Untuk Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Untuk Chrome, Safari, dan Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // Untuk IE/Edge
        elem.msRequestFullscreen();
    }
}

// Cegah klik kanan dan beberapa kombinasi keyboard
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 't' || e.key === 'w')) {
        e.preventDefault();
    }
});

const noteToggle = document.getElementById("noteToggle");
const notePanel = document.getElementById("notePanel");
const closeNote = document.getElementById("closeNote");
const noteArea = document.getElementById("noteArea");

noteToggle.addEventListener("click", function () {
    notePanel.style.display = "flex";
});

closeNote.addEventListener("click", function () {
    notePanel.style.display = "none";
});

noteArea.value = localStorage.getItem("ujianNotepad") || "";

noteArea.addEventListener("input", function () {
    localStorage.setItem("ujianNotepad", noteArea.value);
});