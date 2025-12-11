window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 800);
});

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
    loader: document.getElementById('verify-loader')
};

function updateUI() {
    ui.error.classList.add('hidden');
    
    if (currentStep > 3) {
        document.title = "Silkware - Ready";
        ui.title.textContent = "Download Ready";
        ui.stepNum.textContent = "3";
        ui.btnText.textContent = "Download Silkware";
        ui.btn.onclick = function() { alert("Download started for v1.0"); };
        ui.bar.style.width = "100%";
        ui.barText.textContent = "Process Complete";
        ui.percent.textContent = "100%";
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
    ui.btnText.textContent = "Get Key Here";
    updateUI();
}

function setReadyState() {
    ui.loader.classList.add('hidden');
    
    // Animate to next step
    if (currentStep < 3) {
        ui.btnText.textContent = "Continue to Checkpoint " + (currentStep + 1);
        ui.barText.textContent = "Verification Successful";
        ui.bar.style.width = (currentStep === 1 ? "40%" : "75%");
        ui.btn.onclick = function() {
            ui.btn.onclick = handleAction; 
            setNextStep();
        };
    } else {
        ui.btnText.textContent = "Finish & Download";
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
        
        if (timePassed > 6000) {
            setReadyState();
        } else {
            ui.loader.classList.add('hidden');
            ui.error.classList.remove('hidden');
            ui.barText.textContent = "Verification Failed";
            isChecking = false; 
        }
    }, 2500); 
});

updateUI();
