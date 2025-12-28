window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1200);

    checkLoginStatus();
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

function openSuggestions() {
    document.getElementById('suggestions-modal').classList.add('active');
}

function scrollToFaq() {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    if(menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        menu.classList.add('active');
    }
}

function checkLoginStatus() {
    var user = localStorage.getItem('silkware_user');
    if (!user) {
        document.getElementById('auth-modal').classList.add('visible');
    }
}

function showNotification(message) {
    var container = document.getElementById('notification-area');
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function handleCustomRegister() {
    var user = document.getElementById('reg-username').value;
    var pass = document.getElementById('reg-password').value;

    if (!user || !pass) {
        alert("Please enter both username and password.");
        return;
    }

    var existingUsers = JSON.parse(localStorage.getItem('silkware_users_db') || "[]");
    if (existingUsers.includes(user)) {
        alert("Username is already taken.");
        return;
    }

    existingUsers.push(user);
    localStorage.setItem('silkware_users_db', JSON.stringify(existingUsers));
    localStorage.setItem('silkware_user', user);

    document.getElementById('auth-modal').classList.remove('visible');
    showNotification(`Account created succesfully. Welcome ${user}.`);
    
    fetch('/admin-panel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, status: 'created' })
    }).catch(() => {});
}

function handlePuterLogin() {
    if (typeof puter !== 'undefined') {
        puter.auth.signIn().then(function(user) {
            localStorage.setItem('silkware_user', user.username);
            document.getElementById('auth-modal').classList.remove('visible');
            showNotification(`Account created succesfully. Welcome ${user.username}.`);
            
            fetch('/admin-panel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, type: 'puter' })
            }).catch(() => {});
            
        }).catch(function(err) {
            console.error(err);
        });
    } else {
        alert("Puter.js not loaded.");
    }
}
