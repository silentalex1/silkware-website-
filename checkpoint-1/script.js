window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 800);
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
    btn: document.getElementById('action-btn'),
    bar: document.getElementById('progress-fill'),
    barText: document.getElementById('progress-text'),
    error: document.getElementById('error-msg'),
    loader: document.getElementById('verify-loader')
};

function updateUI() {
    ui.error.classList.add('hidden');
    
    if (currentStep > 3) {
        document.title = "Completed";
        ui.title.textContent = "Download Ready";
        ui.btn.textContent = "Download Executor";
        ui.btn.onclick = function() { alert("Download started!"); };
        ui.bar.style.width = "100%";
        ui.barText.textContent = "All checkpoints finished";
        return;
    }

    document.title = "Checkpoint " + currentStep;
    ui.title.textContent = "Checkpoint " + currentStep;
    ui.barText.textContent = "at checkpoint-" + currentStep;
    
    if (currentStep === 1) ui.bar.style.width = "20%";
    if (currentStep === 2) ui.bar.style.width = "50%";
    if (currentStep === 3) ui.bar.style.width = "80%";
}

function handleAction() {
    if (isChecking) {
        setNextStep();
        return;
    }

    var link = links[currentStep];
    window.open(link, '_blank');
    clickTime = Date.now();
    isChecking = true;
    ui.error.classList.add('hidden');
}

function setNextStep() {
    currentStep++;
    isChecking = false;
    ui.btn.textContent = "Get key here";
    updateUI();
}

function setReadyState() {
    ui.loader.classList.add('hidden');
    
    if (currentStep < 3) {
        ui.btn.textContent = "Checkpoint " + (currentStep + 1);
        ui.barText.textContent = "ready for checkpoint " + (currentStep + 1);
        ui.bar.style.width = (currentStep === 1 ? "40%" : "70%");
    } else {
        ui.btn.textContent = "Finish";
        ui.barText.textContent = "ready to finish";
        ui.bar.style.width = "100%";
    }
}

window.addEventListener('focus', function() {
    if (!isChecking) return;

    ui.error.classList.add('hidden');
    ui.loader.classList.remove('hidden');

    setTimeout(function() {
        var timePassed = Date.now() - clickTime;
        
        if (timePassed > 6000) {
            setReadyState();
        } else {
            ui.loader.classList.add('hidden');
            ui.error.classList.remove('hidden');
            isChecking = false; 
        }
    }, 2500); 
});

updateUI();
