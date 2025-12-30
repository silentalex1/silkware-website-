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

var words = ['Clean', 'Fast', 'Stable', 'Safe'];
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
    
    if(item.classList.contains('active')) {
        item.classList.remove('active');
    } else {
        allItems.forEach(function(i) { i.classList.remove('active'); });
        item.classList.add('active');
    }
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
    } else {
        document.getElementById('support-btn').classList.remove('hidden');
    }
}

function showNotification(message) {
    var container = document.getElementById('notification-area');
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"></path>
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
    var user = document.getElementById('reg-username').value.trim();
    var pass = document.getElementById('reg-password').value.trim();

    if (!user || !pass) {
        alert("Please enter both username and password.");
        return;
    }

    var usersDb = JSON.parse(localStorage.getItem('silkware_users_db') || "[]");
    
    var userExists = usersDb.some(function(u) { return u.username.toLowerCase() === user.toLowerCase(); });

    if (userExists) {
        alert("Username is already taken.");
        return;
    }

    var newId = 'silk-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    
    usersDb.push({ 
        id: newId,
        username: user, 
        password: pass, 
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
    });
    
    localStorage.setItem('silkware_users_db', JSON.stringify(usersDb));
    localStorage.setItem('silkware_user', user);

    document.getElementById('auth-modal').classList.remove('visible');
    document.getElementById('support-btn').classList.remove('hidden');
    showNotification(`Account created successfully. Welcome ${user}.`);
    
    fetch('/admin-panel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: newId,
            username: user, 
            status: 'created', 
            type: 'custom',
            timestamp: new Date().toISOString()
        })
    }).catch(function() {});
}

function handlePuterLogin() {
    if (typeof puter !== 'undefined') {
        puter.auth.signIn().then(function(user) {
            localStorage.setItem('silkware_user', user.username);
            document.getElementById('auth-modal').classList.remove('visible');
            document.getElementById('support-btn').classList.remove('hidden');
            showNotification(`Account created successfully. Welcome ${user.username}.`);
            
            fetch('/admin-panel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, type: 'puter' })
            }).catch(function() {});
            
        }).catch(function(err) {
            console.error(err);
        });
    } else {
        alert("Puter.js not loaded.");
    }
}

function submitSuggestion() {
    var modal = document.getElementById('suggestions-modal');
    var input = modal.querySelector('.modal-input');
    var area = modal.querySelector('.modal-textarea');
    
    if(!input.value || !area.value) {
        alert("Please fill in all fields.");
        return;
    }
    
    modal.classList.remove('active');
    showNotification("Suggestion submitted successfully.");
    
    input.value = "";
    area.value = "";
}

function toggleSupport() {
    var chat = document.getElementById('support-chat');
    if (chat.classList.contains('hidden')) {
        chat.classList.remove('hidden');
    } else {
        chat.classList.add('hidden');
    }
}

function callForHelp() {
    var user = localStorage.getItem('silkware_user') || 'Anonymous';
    var webhook = "https://discord.com/api/webhooks/1455383870798168127/tCR8H34war5e0ggjEpcJoo6Ql0UVIL0rp9pseXcPt-Zi2VwLf4r4IyxGo-w6LNJHWFzs";
    
    var payload = {
        content: `<@&1455385005999001837> **${user}** has called out for help! Please help them.\n\n-- If the user wastes your time, please take a screenshot and report the user. Use the command "/report", in the <@silkware#4843> bot then follow the directions take care.`
    };

    fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(function() {
        appendMessage("System", "Support request sent. A staff member will be with you shortly.");
        document.getElementById('call-help-btn').style.display = 'none';
    }).catch(function() {
        alert("Failed to connect to support.");
    });
}

function handleChatKey(e) {
    if(e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    var input = document.getElementById('chat-input');
    var msg = input.value.trim();
    if(!msg) return;

    var user = localStorage.getItem('silkware_user') || 'User';
    appendMessage("You", msg);
    
    var webhook = "https://discord.com/api/webhooks/1455383870798168127/tCR8H34war5e0ggjEpcJoo6Ql0UVIL0rp9pseXcPt-Zi2VwLf4r4IyxGo-w6LNJHWFzs";
    fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `**${user}**: ${msg}` })
    });

    input.value = "";
}

function appendMessage(sender, text) {
    var history = document.getElementById('chat-history');
    var div = document.createElement('div');
    
    if(sender === 'System') div.className = 'chat-msg system';
    else if(sender === 'You') div.className = 'chat-msg user';
    else div.className = 'chat-msg staff';
    
    div.textContent = text;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
}
