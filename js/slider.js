function initSlider() {
    console.log("Initializing slider...");

    if (!document.querySelector('.banner__slider')) {
        console.error("Banner slider not found in DOM!");
        setTimeout(initSlider, 500);
        return;
    }

    const sliderItems = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.slider__nav .prev');
    const nextButton = document.querySelector('.slider__nav .next');
    const dots = document.querySelectorAll('.slider__dots .dot');
    
    console.log(`Found ${sliderItems.length} slides, prev button: ${prevButton ? 'yes' : 'no'}, next button: ${nextButton ? 'yes' : 'no'}, dots: ${dots.length}`);
    
    if (sliderItems.length === 0) {
        console.error("No slider items found!");
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        console.log(`Showing slide ${index}`);
        
        if (index < 0 || index >= sliderItems.length) {
            console.error(`Invalid slide index: ${index}`);
            return;
        }
        
        sliderItems.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        sliderItems[index].style.display = 'block';
        sliderItems[index].classList.add('active');
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const newIndex = (currentSlide + 1) % sliderItems.length;
        console.log(`Next slide clicked, moving from ${currentSlide} to ${newIndex}`);
        showSlide(newIndex);
    }
    
    function prevSlide() {
        const newIndex = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        console.log(`Prev slide clicked, moving from ${currentSlide} to ${newIndex}`);
        showSlide(newIndex);
    }
    
    function startAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    if (prevButton) {
        console.log("Adding click event to prev button");
        prevButton.onclick = function(e) {
            e.preventDefault();
            prevSlide();
            startAutoSlide();
        };
    } else {
        console.error("Previous button not found!");
    }
    
    if (nextButton) {
        console.log("Adding click event to next button");
        nextButton.onclick = function(e) {
            e.preventDefault();
            nextSlide();
            startAutoSlide();
        };
    } else {
        console.error("Next button not found!");
    }
    
    dots.forEach((dot, index) => {
        dot.onclick = function(e) {
            e.preventDefault();
            showSlide(index);
            startAutoSlide();
        };
    });
    
    let activeIndex = -1;
    sliderItems.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    if (activeIndex === -1 && sliderItems.length > 0) {
        activeIndex = 0;
    }
    
    showSlide(activeIndex);
    
    startAutoSlide();
    
    const sliderContainer = document.querySelector('.banner__slider');
    if (sliderContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            
            const swipeDistance = touchEndX - touchStartX;
            
            const minSwipeDistance = 50;
            
            if (swipeDistance < -minSwipeDistance) {
                nextSlide();
                startAutoSlide();
            } else if (swipeDistance > minSwipeDistance) {
                prevSlide();
                startAutoSlide();
            }
        }, {passive: true});
    }
    
    console.log("Slider initialization complete");
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, initializing slider");
    setTimeout(initSlider, 100);
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("DOM already ready, initializing slider immediately");
    setTimeout(initSlider, 100);
}