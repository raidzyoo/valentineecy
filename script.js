// Data penerima
const recipientData = {
    name: "Sinta",
    senderName: "Raka"
};

// Elemen DOM
const openingScreen = document.getElementById('openingScreen');
const letterContent = document.getElementById('letterContent');
const mainEnvelope = document.getElementById('mainEnvelope');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const revealSecretBtn = document.getElementById('revealSecretBtn');
const hiddenSection = document.getElementById('hiddenSection');
const addHeartBtn = document.getElementById('addHeartBtn');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const heartCounter = document.getElementById('heartCounter');
const valentineMusic = document.getElementById('valentineMusic');
const openSound = document.getElementById('openSound');

// State variables
let heartCount = 0;
let isMusicPlaying = false;
let isSecretRevealed = false;

// Fungsi untuk membuka amplop
function openEnvelope() {
    // Mainkan suara buka amplop
    if (openSound) {
        openSound.play().catch(e => console.log("Audio autoplay blocked"));
    }
    
    // Tambah efek animasi pada amplop
    mainEnvelope.classList.add('opened');
    
    // Tunggu animasi selesai, lalu tampilkan surat
    setTimeout(() => {
        openingScreen.style.display = 'none';
        letterContent.style.display = 'block';
        
        // Buat hati melayang
        createFloatingHearts();
    }, 1000);
}

// Fungsi untuk membuat hati melayang
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        const leftPos = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        const size = 15 + Math.random() * 15;
        
        heart.style.left = `${leftPos}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;
        
        container.appendChild(heart);
    }
}

// Fungsi untuk membuka pesan rahasia
function revealSecret() {
    if (!isSecretRevealed) {
        hiddenSection.style.display = 'block';
        revealSecretBtn.innerHTML = '<i class="fas fa-heart"></i> Tutup Pesan';
        isSecretRevealed = true;
        
        // Tambah heart count
        heartCount += 5;
        updateHeartCounter();
        
        // Efek confetti hati
        createHeartConfetti();
    } else {
        hiddenSection.style.display = 'none';
        revealSecretBtn.innerHTML = '<i class="fas fa-heart"></i> Pesan Khusus';
        isSecretRevealed = false;
    }
}

// Fungsi untuk menambah hati
function addHeart() {
    heartCount++;
    updateHeartCounter();
    
    // Buat efek hati melayang dari tombol
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart" style="color:#ff4081; font-size:20px;"></i>';
    heart.style.position = 'fixed';
    
    const btnRect = addHeartBtn.getBoundingClientRect();
    heart.style.left = `${btnRect.left + btnRect.width/2}px`;
    heart.style.top = `${btnRect.top}px`;
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(heart);
    
    // Animasi hati naik
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -100px) scale(1.3)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
    });
    
    animation.onfinish = () => {
        if (heart.parentNode) heart.remove();
    };
}

// Fungsi untuk mengupdate counter hati
function updateHeartCounter() {
    heartCounter.textContent = heartCount;
    heartCounter.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        heartCounter.style.transform = 'scale(1)';
    }, 200);
}

// Fungsi untuk mengontrol musik
function toggleMusic() {
    if (isMusicPlaying) {
        valentineMusic.pause();
        musicText.textContent = 'Musik';
        musicBtn.innerHTML = '<i class="fas fa-music"></i> Musik';
        isMusicPlaying = false;
    } else {
        valentineMusic.volume = 0.3;
        valentineMusic.play().catch(e => {
            console.log("Autoplay diblokir. Klik lagi untuk memutar musik.");
            musicBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
            musicText.textContent = 'Putar';
        }).then(() => {
            musicText.textContent = 'Jeda';
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
            isMusicPlaying = true;
            
            // Tambah hati
            heartCount += 2;
            updateHeartCounter();
        });
    }
}

// Fungsi untuk efek confetti hati
function createHeartConfetti() {
    const container = document.querySelector('.letter-body');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'absolute';
        heart.style.color = '#ff4081';
        heart.style.fontSize = '16px';
        heart.style.opacity = '0.9';
        heart.style.zIndex = '10';
        
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        heart.style.left = `${xPos}%`;
        heart.style.top = `${yPos}%`;
        
        container.appendChild(heart);
        
        const animation = heart.animate([
            { transform: 'translateY(-80px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(80px) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 800,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => {
            if (heart.parentNode) heart.remove();
        };
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4081;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(255, 64, 129, 0.4);
        animation: fadeInOut 2.5s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2500);
}

// Fungsi untuk menginisialisasi event listeners
function initEventListeners() {
    // Buka amplop dengan tombol
    openEnvelopeBtn.addEventListener('click', openEnvelope);
    
    // Buka amplop dengan klik langsung pada amplop
    mainEnvelope.addEventListener('click', openEnvelope);
    
    // Buka/tutup pesan rahasia
    revealSecretBtn.addEventListener('click', revealSecret);
    
    // Tambah hati
    addHeartBtn.addEventListener('click', addHeart);
    
    // Kontrol musik
    musicBtn.addEventListener('click', toggleMusic);
    
    // Shortcut keyboard
    document.addEventListener('keydown', (e) => {
        // Spasi untuk musik
        if (e.code === 'Space') {
            e.preventDefault();
            toggleMusic();
        }
    });
}

// Fungsi untuk menginisialisasi aplikasi
function initApp() {
    // Update nama penerima
    document.querySelector('.recipient-name').textContent = recipientData.name;
    document.title = `Surat Valentine untuk ${recipientData.name}`;
    
    // Inisialisasi event listeners
    initEventListeners();
    
    // Buat hati melayang di layar pembuka
    const openingHearts = document.querySelector('.floating-hearts-opening');
    if (openingHearts) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            
            const leftPos = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = 10 + Math.random() * 10;
            
            heart.style.left = `${leftPos}%`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.fontSize = `${15 + Math.random() * 10}px`;
            
            openingHearts.appendChild(heart);
        }
    }
    
    // Auto-increment hati setiap 3 detik
    setInterval(() => {
        heartCount++;
        updateHeartCounter();
    }, 3000);
}

// Cara Mengubah Nama Penerima:
// Ubah variabel recipientData di atas:
// - name: Nama penerima
// - senderName: Nama pengirim

// Contoh:
// const recipientData = {
//     name: "Diana",
//     senderName: "Anda"
// };

// Jalankan aplikasi saat halaman dimuat
window.addEventListener('DOMContentLoaded', initApp);