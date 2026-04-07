document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.open_button');
    const closeButton = document.querySelector('.close_button');
    const modalOverlay = document.querySelector('.modal-overlay');
    const progressFill = document.querySelector('.progress-fill');
    const progressTextLight = document.querySelector('.progress-text-light');
    const duration = 3000;
    let startTime = null;
    let animationId = null;

    function resetProgress() {
        progressFill.style.width = '0';
        progressTextLight.style.width = '0';
        progressFill.style.backgroundColor = '#d62828';
        startTime = null;
    }

    function animateProgress(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percent = progress * 100;

        progressFill.style.width = percent + '%';
        progressTextLight.style.width = percent + '%';

        if (progress < 1) {
            animationId = requestAnimationFrame(animateProgress);
        }
    }

    function openModal() {
        modalOverlay.classList.remove('hidden');
        resetProgress();

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        animationId = requestAnimationFrame(animateProgress);
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');

        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });
});