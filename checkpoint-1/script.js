document.addEventListener('DOMContentLoaded', () => {
    
    document.body.style.opacity = '1';

    const aboutBtn = document.getElementById('about-btn');
    
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert('Being worked on.'); 
        });
    }

});