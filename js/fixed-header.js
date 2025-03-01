function initFixedHeader() {
    const header = document.querySelector('.header');
    const body = document.body;
    
    if (!header) {
        console.error("Header element not found!");
        return;
    }
    
    const headerHeight = header.offsetHeight;
    
    function handleScroll() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        if (scrollPosition > 50) {
            header.classList.add('header--fixed');
            body.classList.add('has-fixed-header');
            body.style.paddingTop = `${headerHeight}px`;
        } else {
            header.classList.remove('header--fixed');
            body.classList.remove('has-fixed-header');
            body.style.paddingTop = '0';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    console.log("Fixed header initialization complete");
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.header')) {
        initFixedHeader();
    } else {
        const checkHeader = setInterval(() => {
            if (document.querySelector('.header')) {
                clearInterval(checkHeader);
                initFixedHeader();
            }
        }, 100);
    }
});