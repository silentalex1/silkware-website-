window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1200);
});

document.addEventListener('mousemove', function(e) {
    var cursor = document.getElementById('cursor-glow');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

var words = ['Stable', 'Smooth', 'Fast', 'Safe'];
var wordIndex = 0;
var wordElement = document.getElementById('changing-word');

function changeWord() {
    if (!wordElement) return;
    wordElement.style.opacity = '0';
    setTimeout(function() {
        wordIndex = (wordIndex + 1) % words.length;
        wordElement.textContent = words[wordIndex];
        wordElement.style.opacity = '1';
    }, 200);
}

setInterval(changeWord, 3000);

function toggleFaq(item) {
    var active = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
    if (!active) item.classList.add('active');
}

function goToCheckpoint() {
    window.location.href = 'checkpoint-1/index.html';
}

function showAbout() {
    document.getElementById('about-modal').classList.add('active');
}

function downloadSilkware() {
    window.location.href = "https://github.com/shadowdih20-cloud/SetupSilkWareDownload/releases/download/executor/SilKWareSetup.exe";
    setTimeout(function() {
        document.getElementById('download-modal').classList.add('active');
    }, 2000);
}

function closeDownloadUI() {
    document.getElementById('download-modal').classList.remove('active');
}

function scrollToFaq() {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}
