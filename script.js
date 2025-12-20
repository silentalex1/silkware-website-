window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
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

var words = ['Safe', 'Stable', 'Smooth', 'Fast'];
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
    }, 1500);
}

function closeDownloadUI() {
    document.getElementById('download-modal').classList.remove('active');
}

function openSuggestions() {
    document.getElementById('suggestion-modal').classList.add('active');
}

function closeSuggestions() {
    document.getElementById('suggestion-modal').classList.remove('active');
}

async function submitSuggestion() {
    var user = document.getElementById('suggest-user').value;
    var text = document.getElementById('suggest-text').value;

    if(!user || !text) return alert("Fill all boxes.");

    var webhook = "https://discord.com/api/webhooks/1452036770848964871/WNFTuWfZCkujiFU3SLc1oCUFcvZpB_NyAsrtz8I-5HKss7bBxpx_auihKp0F7scOKxAO";
    
    var data = {
        content: null,
        embeds: [{
            title: "New User Suggestion",
            color: 65365,
            fields: [
                { name: "Discord Username", value: user },
                { name: "Suggestion", value: text }
            ]
        }]
    };

    try {
        await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        alert("Suggestion sent.");
        document.getElementById('suggest-user').value = "";
        document.getElementById('suggest-text').value = "";
        closeSuggestions();
    } catch (e) {
        alert("Failed to send.");
    }
}

function scrollToFaq() {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}
