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
var generatedKey = "";

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
        showKeyGenerationUI();
        return;
    }

    document.title = "Checkpoint " + currentStep;
    ui.title.textContent = "Checkpoint " + currentStep;
    ui.stepNum.textContent = currentStep;
    ui.barText.textContent = "Waiting for action...";
    
    var width = "0%";
    if (currentStep === 1) width = "10%";
    if (currentStep === 2) width = "45%";
    if (currentStep === 3) width = "80%";
    
    ui.bar.style.width = width;
    ui.percent.textContent = width;
    ui.btnText.textContent = "Get Key Here";
}

function handleAction() {
    if (isChecking) return;

    var link = links[currentStep];
    window.open(link, '_blank');
    
    clickTime = Date.now();
    isChecking = true;
    ui.error.classList.add('hidden');
}

function setNextStep() {
    currentStep++;
    isChecking = false;
    
    localStorage.setItem('silkware_step', currentStep);
    
    updateUI();
}

function setReadyState() {
    ui.loader.classList.add('hidden');
    
    if (currentStep < 3) {
        ui.btnText.textContent = "Continue to Checkpoint " + (currentStep + 1);
        ui.barText.textContent = "Verification Successful";
        ui.bar.style.width = (currentStep === 1 ? "40%" : "75%");
        ui.btn.onclick = function() {
            ui.btn.onclick = handleAction; 
            setNextStep();
        };
    } else {
        ui.btnText.textContent = "Finish & Get Key";
        ui.barText.textContent = "All Systems Go";
        ui.bar.style.width = "95%";
        ui.btn.onclick = function() {
            setNextStep(); 
        };
    }
}

window.addEventListener('focus', function() {
    if (!isChecking) return;

    ui.error.classList.add('hidden');
    ui.loader.classList.remove('hidden');
    ui.barText.textContent = "Verifying...";

    setTimeout(function() {
        var timePassed = Date.now() - clickTime;
        
        if (timePassed > 5000) {
            setReadyState();
        } else {
            ui.loader.classList.add('hidden');
            ui.error.classList.remove('hidden');
            ui.barText.textContent = "Verification Failed";
            isChecking = false; 
        }
    }, 2000); 
});

function showKeyGenerationUI() {
    if(!generatedKey) {
        generatedKey = "SILK-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    }
    
    ui.keyDisplay.textContent = generatedKey;
    ui.keyOverlay.classList.remove('hidden');
}

function copyKey() {
    navigator.clipboard.writeText(generatedKey);
}

function closeKeyUI() {
    ui.keyOverlay.classList.add('hidden');
    ui.title.textContent = "Complete";
    ui.btnText.textContent = "View Saved Keys";
    ui.btn.onclick = toggleKeysModal;
}

function saveKeyToSite() {
    var savedKeys = JSON.parse(localStorage.getItem('silkware_keys') || "[]");
    
    if(!savedKeys.some(k => k.key === generatedKey)) {
        savedKeys.push({
            key: generatedKey,
            expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        });
        localStorage.setItem('silkware_keys', JSON.stringify(savedKeys));
        alert("Key saved successfully!");
    } else {
        alert("Key already saved.");
    }
}

function toggleKeysModal() {
    var modal = ui.savedKeysOverlay;
    if (modal.classList.contains('hidden')) {
        renderSavedKeys();
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

function renderSavedKeys() {
    var list = ui.keysList;
    list.innerHTML = "";
    
    var savedKeys = JSON.parse(localStorage.getItem('silkware_keys') || "[]");
    var now = Date.now();
    
    savedKeys = savedKeys.filter(k => k.expiry > now);
    localStorage.setItem('silkware_keys', JSON.stringify(savedKeys));
    
    if (savedKeys.length === 0) {
        list.innerHTML = '<p class="no-keys">No active keys found.</p>';
        return;
    }
    
    savedKeys.forEach(k => {
        var timeLeft = k.expiry - now;
        var hours = Math.floor(timeLeft / (1000 * 60 * 60));
        var mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        var div = document.createElement('div');
        div.className = 'key-item';
        div.innerHTML = `
            <div>
                <span class="key-code">${k.key}</span>
                <span class="key-timer">Expires in: ${hours}h ${mins}m</span>
            </div>
        `;
        list.appendChild(div);
    });
}

var savedStep = localStorage.getItem('silkware_step');
if(savedStep) {
    currentStep = parseInt(savedStep);
}
updateUI();
