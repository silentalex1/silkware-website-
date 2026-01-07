window.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        wrapper.style.opacity = '1';
    }, 100);
});
