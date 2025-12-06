document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const robloxLogo = document.getElementById('roblox-logo');
    const silkwireText = document.getElementById('silkwire-text');
    const mainContent = document.getElementById('main-content');
    const dynamicTextWords = document.getElementById('dynamic-text-words');
    const dynamicTextBox = document.getElementById('dynamic-text-box');
    const faqSection = document.getElementById('faq-section');
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const startLoadingAnimation = () => {
        if (!loadingScreen) return;

        robloxLogo.style.transform = 'translateY(0) scale(1)';

        setTimeout(() => {
            robloxLogo.style.transform = 'translateX(22rem) translateY(0) scale(0.6)'; 
            robloxLogo.style.opacity = '1';
            silkwireText.style.opacity = '1';
        }, 100); 

        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            if (mainContent) mainContent.style.opacity = '1';
            if (dynamicTextWords) startDynamicText();
        }, 1500); 

        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2500); 
    };

    const words = [
        "Best Stable",
        "Best Smooth",
        "Best Fast",
        "Best Powerful",
        "Best Undetected",
        "Best Reliable"
    ];
    let wordIndex = 0;

    const updateDynamicText = () => {
        if (!dynamicTextWords) return;

        const currentWord = words[wordIndex];
        
        dynamicTextWords.style.opacity = '0';
        dynamicTextBox.style.transform = 'scale(0.8) skewX(5deg)';
        
        setTimeout(() => {
            dynamicTextWords.textContent = currentWord;
            
            const estimatedWidth = currentWord.length * (window.innerWidth < 768 ? 40 : 50) + 20; 
            dynamicTextBox.style.width = `${estimatedWidth}px`;
            
            setTimeout(() => {
                dynamicTextBox.style.transform = 'scale(1) skewX(0deg)';
                dynamicTextWords.style.opacity = '1';
            }, 50);

            wordIndex = (wordIndex + 1) % words.length;
        }, 500); 
    };

    const startDynamicText = () => {
        updateDynamicText(); 
        setInterval(updateDynamicText, 2800); 
    }

    const handleScroll = () => {
        if (!faqSection) return;

        const scrollPosition = window.scrollY;
        const sectionPosition = faqSection.offsetTop;
        const triggerPoint = sectionPosition - (window.innerHeight / 1.3);

        if (scrollPosition > triggerPoint) {
            faqSection.style.opacity = '1';
            faqSection.style.transform = 'translateY(0)';
        } else {
            faqSection.style.opacity = '0';
            faqSection.style.transform = 'translateY(10px)';
        }
    };
    
    if (faqSection) {
        window.addEventListener('scroll', handleScroll);
    }

    if (aboutBtn && aboutModal && closeModalBtn) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            aboutModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            aboutModal.classList.add('hidden');
        });

        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.add('hidden');
            }
        });
    }

    startLoadingAnimation();
});