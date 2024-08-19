document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector('.slideshow-container');
    let currentSlide = 0;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    };

    setInterval(() => showSlide(currentSlide + 1), 3000);
    showSlide(currentSlide);
});

