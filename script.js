window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
});

var words = ['Stable', 'Smooth', 'Fast', 'Powerful', 'Reliable', 'Undetected'];
var currentIndex = 0;
var wordElement = document.getElementById('changing-word');

function updateWord() {
    wordElement.style.opacity = '0';
    wordElement.style.transform = 'translateY(-10px) scale(0.95)';
    
    setTimeout(function() {
        currentIndex = (currentIndex + 1) % words.length;
        wordElement.textContent = words[currentIndex];
        wordElement.style.opacity = '1';
        wordElement.style.transform = 'translateY(0) scale(1)';
    }, 300);
}

setInterval(updateWord, 3500);

var faqSection = document.getElementById('faq');
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

observer.observe(faqSection);

var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function toggleFaq(element) {
    var wasActive = element.classList.contains('active');
    var items = document.querySelectorAll('.faq-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    if (!wasActive) {
        element.classList.add('active');
    }
}

function goToCheckpoint() {
    window.location.href = '/checkpoint-1';
}

function showAbout() {
    document.getElementById('about-modal').classList.add('active');
}
