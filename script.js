window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1200);
});

var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

var words = ['Execution', 'Performance', 'Stability', 'Quality'];
var wordIndex = 0;
var wordElement = document.getElementById('changing-word');

function changeWord() {
    if(!wordElement) return;
    
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

function toggleFaq(item) {
    const allItems = document.querySelectorAll('.faq-item');
    
    if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
    }

    allItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
}

function goToCheckpoint() {
    window.location.href = '/checkpoint-1';
}

function showAbout() {
    document.getElementById('about-modal').classList.add('active');
}

function scrollToFaq() {
    document.getElementById('faq').scrollIntoView({ 
        behavior: 'smooth' 
    });
}
