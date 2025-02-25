// Function to initialize banner slider
function initSlider() {
    console.log("Initializing slider...");

    // Đảm bảo slider elements đã được load đầy đủ
    if (!document.querySelector('.banner__slider')) {
        console.error("Banner slider not found in DOM!");
        // Đợi một chút và thử lại
        setTimeout(initSlider, 500);
        return;
    }

    const sliderItems = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.slider__nav .prev');
    const nextButton = document.querySelector('.slider__nav .next');
    const dots = document.querySelectorAll('.slider__dots .dot');
    
    // Debug log
    console.log(`Found ${sliderItems.length} slides, prev button: ${prevButton ? 'yes' : 'no'}, next button: ${nextButton ? 'yes' : 'no'}, dots: ${dots.length}`);
    
    if (sliderItems.length === 0) {
        console.error("No slider items found!");
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Show slide with specific index - primary function
    function showSlide(index) {
        console.log(`Showing slide ${index}`);
        
        // Validate index
        if (index < 0 || index >= sliderItems.length) {
            console.error(`Invalid slide index: ${index}`);
            return;
        }
        
        // Deactivate all slides
        sliderItems.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Activate current slide
        sliderItems[index].style.display = 'block';
        sliderItems[index].classList.add('active');
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Show next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % sliderItems.length;
        console.log(`Next slide clicked, moving from ${currentSlide} to ${newIndex}`);
        showSlide(newIndex);
    }
    
    // Show previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        console.log(`Prev slide clicked, moving from ${currentSlide} to ${newIndex}`);
        showSlide(newIndex);
    }
    
    // Reset and start auto-slide interval
    function startAutoSlide() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // Start new interval
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Directly add event listeners to navigation buttons
    if (prevButton) {
        console.log("Adding click event to prev button");
        prevButton.onclick = function(e) {
            e.preventDefault();
            prevSlide();
            startAutoSlide(); // Reset interval after manual navigation
        };
    } else {
        console.error("Previous button not found!");
    }
    
    if (nextButton) {
        console.log("Adding click event to next button");
        nextButton.onclick = function(e) {
            e.preventDefault();
            nextSlide();
            startAutoSlide(); // Reset interval after manual navigation
        };
    } else {
        console.error("Next button not found!");
    }
    
    // Add click events to dot indicators
    dots.forEach((dot, index) => {
        dot.onclick = function(e) {
            e.preventDefault();
            showSlide(index);
            startAutoSlide(); // Reset interval after manual navigation
        };
    });
    
    // Ensure first slide is visible initially
    // Find which slide has active class
    let activeIndex = -1;
    sliderItems.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    // If no slide is active, make the first one active
    if (activeIndex === -1 && sliderItems.length > 0) {
        activeIndex = 0;
    }
    
    // Show the active slide
    showSlide(activeIndex);
    
    // Start auto-sliding
    startAutoSlide();
    
    // Add touch swipe support for mobile devices
    const sliderContainer = document.querySelector('.banner__slider');
    if (sliderContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            
            // Calculate swipe distance
            const swipeDistance = touchEndX - touchStartX;
            
            // Minimum distance required for swipe
            const minSwipeDistance = 50;
            
            if (swipeDistance < -minSwipeDistance) {
                // Swiped left - show next slide
                nextSlide();
                startAutoSlide();
            } else if (swipeDistance > minSwipeDistance) {
                // Swiped right - show previous slide
                prevSlide();
                startAutoSlide();
            }
        }, {passive: true});
    }
    
    console.log("Slider initialization complete");
}

// Đảm bảo script chạy khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, initializing slider");
    // Chạy với một chút delay để đảm bảo tất cả components đã load
    setTimeout(initSlider, 100);
});

// Nếu script được load sau khi DOM đã ready, chạy ngay
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("DOM already ready, initializing slider immediately");
    setTimeout(initSlider, 100);
}