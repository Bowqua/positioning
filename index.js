document.addEventListener('DOMContentLoaded', () => {

    const progressFill = document.querySelector('.progress-fill');

    const duration = 3000;
    let startTime = null;

    function animateProgress(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        progressFill.style.width = (progress * 100) + '%';


        const redIntensity = Math.floor(progress * 255);
        progressFill.style.backgroundColor = `rgb(${redIntensity}, 0, 0)`;

        if (progress < 1) {
            requestAnimationFrame(animateProgress);
        }
    }

    requestAnimationFrame(animateProgress);

});