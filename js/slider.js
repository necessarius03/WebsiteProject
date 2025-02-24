// Function to initialize banner slider
function initSlider() {
    const sliderItems = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    function resetSlides() {
        sliderItems.forEach((slide, index) => {
            if (index !== currentSlide) {
                slide.style.display = 'none';
            } else {
                slide.style.display = 'block';
            }
        });
    }
    
    // Show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        resetSlides();
    }
    
    // Show previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        resetSlides();
    }
    
    // Add event listeners to buttons
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize slider
    resetSlides();
}