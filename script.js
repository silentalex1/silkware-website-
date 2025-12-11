window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
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
    wordElement.style.opacity = '0';
    wordElement.style.transform = 'translateY(10px)';
    
    setTimeout(function() {
        wordIndex = (wordIndex + 1) % words.length;
        wordElement.textContent = words[wordIndex];
        wordElement.style.opacity = '1';
        wordElement.style.transform = 'translateY(0)';
    }, 200);
}

setInterval(changeWord, 3000);

function toggleFaq(card) {
    const allCards = document.querySelectorAll('.faq-card');
    
    allCards.forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    
    card.classList.toggle('active');
}

function goToCheckpoint() {
    window.location.href = '/checkpoint-1';
}

function showAbout() {
    document.getElementById('about-modal').classList.add('active');
}
