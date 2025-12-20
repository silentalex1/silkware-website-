<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkpoint 1</title>
    <link rel="icon" type="image/png" href="../silkwarelogo.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="checkpoint.css">
</head>
<body>
    <div class="cursor-glow" id="cursor-glow"></div>

    <nav class="glass-nav">
        <div class="nav-content">
            <button onclick="window.location.href='../index.html'" class="back-btn">
                <span>Go Back</span>
            </button>
            
            <div class="nav-brand-center">
                <img src="../silkwarelogo.png" alt="Silkware">
                <span>Silkware</span>
            </div>
            
            <button class="keys-btn" onclick="toggleKeysModal()">
                <span>Keys</span>
            </button>
        </div>
    </nav>

    <div class="checkpoint-wrapper">
        <div class="checkpoint-box" id="main-box">
            <div class="box-glow"></div>
            
            <div class="cp-header">
                <h1 id="cp-title">Checkpoint 1</h1>
                <div class="step-indicator">Step <span id="step-number">1</span> of 3</div>
            </div>
            
            <div class="status-zone">
                <p id="error-msg" class="status-msg error hidden">Did you do the key system?</p>
                <div id="verify-loader" class="status-msg loading hidden">
                    <div class="mini-spin"></div>
                    <span>Verifying...</span>
                </div>
            </div>

            <button id="action-btn" class="glow-btn" onclick="handleAction()">
                <span>Get Key Here</span>
            </button>

            <div class="bar-container">
                <div class="bar-bg">
                    <div id="progress-fill" class="bar-fill"></div>
                </div>
                <div class="bar-info">
                    <span id="progress-text">Waiting for user...</span>
                    <span id="percent-text">0%</span>
                </div>
            </div>
        </div>

        <div class="help-text">
            <h3>Instructions</h3>
            <p class="simple-note">Complete the steps to get your key.</p>
        </div>
    </div>

    <div id="key-overlay" class="overlay hidden">
        <div class="key-modal">
            <h2>Key Generated</h2>
            <p>Your key is ready.</p>
            
            <div class="key-display" onclick="copyKey()">
                <span class="key-text" id="generated-key">LOADING...</span>
            </div>

            <div class="key-actions">
                <button class="save-btn" onclick="saveKeyToSite()">Save key to site</button>
                <button class="close-btn-modal" onclick="closeKeyUI()">Close key ui</button>
            </div>
        </div>
    </div>

    <div id="saved-keys-overlay" class="overlay hidden">
        <div class="saved-keys-modal">
            <div class="modal-header">
                <h2>Saved Keys</h2>
                <button onclick="toggleKeysModal()">✕</button>
            </div>
            <div class="keys-list" id="keys-list"></div>
        </div>
    </div>

    <script src="checkpoint.js"></script>
</body>
</html>
