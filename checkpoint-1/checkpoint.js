document.addEventListener('mousemove', function(e) {
    var cursor = document.getElementById('cursor-glow');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

var currentStep = 1;
var isChecking = false;
var clickTime = 0;

var links = {
    1: "https://work.ink/27Tr/ypomvhuy",
    2: "https://work.ink/27Tr/checkpoint-02",
    3: "https://work.ink/27Tr/ffft3jcz"
};

var ui = {
    title: document.getElementById('cp-title'),
    stepNum: document.getElementById('step-number'),
    btn: document.getElementById('action-btn'),
    btnText: document.querySelector('#action-btn span'),
    bar: document.getElementById('progress-fill'),
    barText: document.getElementById('progress-text'),
    percent: document.getElementById('percent-text'),
    error: document.getElementById('error-msg'),
    loader: document.getElementById('verify-loader'),
    keyOverlay: document.getElementById('key-overlay'),
    keyDisplay: document.getElementById('generated-key'),
    savedKeysOverlay: document.getElementById('saved-keys-overlay'),
    keysList: document.getElementById('keys-list')
};

function updateUI() {
    ui.error.classList.add('hidden');
    if (currentStep > 3) {
        generateKeyFromAPI();
        return;
    }
    ui.title.textContent = "Checkpoint " + currentStep;
    ui.stepNum.textContent = currentStep;
    var progress = (currentStep === 1) ? 15 : (currentStep === 2) ? 45 : 80;
    ui.bar.style.width = progress + "%";
    ui.percent.textContent = progress + "%";
}

function handleAction() {
    if (isChecking) return;
    window.open(links[currentStep], '_blank');
    clickTime = Date.now();
    isChecking = true;
    ui.error.classList.add('hidden');
}

window.addEventListener('focus', function() {
    if (!isChecking) return;
    ui.loader.classList.remove('hidden');
    ui.barText.textContent = "Verifying...";

    setTimeout(function() {
        var elapsed = Date.now() - clickTime;
        ui.loader.classList.add('hidden');
        if (elapsed > 10000) {
            if (currentStep < 3) {
                currentStep++;
                isChecking = false;
                updateUI();
            } else {
                currentStep = 4;
                updateUI();
            }
        } else {
            ui.error.classList.remove('hidden');
            isChecking = false;
        }
    }, 2000);
});

async function generateKeyFromAPI() {
    ui.keyOverlay.classList.remove('hidden');
    ui.keyDisplay.textContent = "GENERATING...";
    try {
        const response = await fetch("https://SilkWareTM.pythonanywhere.com/add_key?duration=6h");
        const key = await response.text();
        ui.keyDisplay.textContent = key.trim();
    } catch (e) {
        ui.keyDisplay.textContent = "KEY-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
}

function copyKey() {
    navigator.clipboard.writeText(ui.keyDisplay.textContent);
    alert("Key copied.");
}

function closeKeyUI() {
    ui.keyOverlay.classList.add('hidden');
    window.location.href = '../index.html';
}

function saveKeyToSite() {
    var key = ui.keyDisplay.textContent;
    var keys = JSON.parse(localStorage.getItem('silk_keys') || "[]");
    keys.push({ val: key, exp: Date.now() + (6 * 60 * 60 * 1000) });
    localStorage.setItem('silk_keys', JSON.stringify(keys));
    alert("Key saved for 6 hours.");
}

function toggleKeysModal() {
    ui.savedKeysOverlay.classList.toggle('hidden');
    if (!ui.savedKeysOverlay.classList.contains('hidden')) {
        renderKeys();
    }
}

function renderKeys() {
    var keys = JSON.parse(localStorage.getItem('silk_keys') || "[]");
    ui.keysList.innerHTML = keys.length ? "" : "No active keys.";
    keys.forEach(k => {
        if (k.exp > Date.now()) {
            var d = document.createElement('div');
            d.className = 'key-item';
            d.innerHTML = `<strong>${k.val}</strong><br><small>6 Hour Session</small>`;
            ui.keysList.appendChild(d);
        }
    });
}

updateUI();
