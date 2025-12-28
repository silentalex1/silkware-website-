window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
        checkAuth();
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

var words = ['Safe', 'Reliable', 'Clean', 'Best'];
var wordIndex = 0;
var wordElement = document.getElementById('changing-word');

function changeWord() {
    if (!wordElement) return;
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
    var allItems = document.querySelectorAll('.faq-item');
    if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
    }
    allItems.forEach(function(i) { i.classList.remove('active'); });
    item.classList.add('active');
}

function goToCheckpoint() {
    window.location.href = '/checkpoint-1';
}

function showAbout() {
    document.getElementById('about-modal').classList.add('active');
}

function showSuggestions() {
    document.getElementById('suggestions-modal').classList.add('active');
}

function scrollToFaq() {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
}

function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if(menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        menu.classList.add('active');
    }
}

var authModal = document.getElementById('auth-modal');
var errorMsg = document.getElementById('auth-error');
var authBtn = document.getElementById('custom-auth-btn');

function checkAuth() {
    var user = localStorage.getItem('silkware_user');
    if (!user) {
        authModal.classList.add('active');
    }
}

function handleCustomRegister() {
    var userIn = document.getElementById('auth-username').value;
    var passIn = document.getElementById('auth-password').value;
    
    errorMsg.textContent = "";
    
    if(userIn.length < 3 || passIn.length < 3) {
        errorMsg.textContent = "Username/Password too short.";
        return;
    }

    var existingUsers = JSON.parse(localStorage.getItem('silkware_users_db') || "[]");
    
    if(existingUsers.includes(userIn)) {
        errorMsg.textContent = "Username already taken.";
        return;
    }

    authBtn.classList.add('loading');
    authBtn.disabled = true;

    setTimeout(function() {
        existingUsers.push(userIn);
        localStorage.setItem('silkware_users_db', JSON.stringify(existingUsers));
        
        completeLogin(userIn);
        
        authBtn.classList.remove('loading');
        authBtn.disabled = false;
    }, 1500);
}

function handlePuterLogin() {
    if(typeof puter !== 'undefined') {
        puter.auth.signIn().then(function(user) {
            completeLogin(user.username || "PuterUser");
        });
    } else {
        errorMsg.textContent = "Puter.js not loaded.";
    }
}

function completeLogin(username) {
    localStorage.setItem('silkware_user', username);
    authModal.classList.remove('active');
    
    showNotification(`Account created successfully. Welcome ${username}.`);
}

function showNotification(text) {
    var area = document.getElementById('notification-area');
    var notif = document.createElement('div');
    notif.className = 'notification-toast';
    notif.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${text}</span>
    `;
    
    area.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => notif.remove(), 400);
    }, 4000);
}
