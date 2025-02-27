// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return false;
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded, starting component initialization");
    
    // Load all components
    // First ensure data script is loaded
    if (typeof products === 'undefined') {
        console.log("Products data not yet available, loading data first");
        // Load the product data script dynamically if not already loaded
        const dataScript = document.createElement('script');
        dataScript.src = 'data/products.js';
        dataScript.onload = async function() {
            await loadComponents();
        };
        document.head.appendChild(dataScript);
    } else {
        await loadComponents();
    }
});

async function loadComponents() {
    // Load components in correct order
    await loadComponent('header', 'components/header.html');
    await loadComponent('banner', 'components/banner.html');
    
    // Load featured products section first (before regular products)
    await loadComponent('features', 'components/featured.html');
    await loadComponent('products', 'components/products.html');
    await loadComponent('footer', 'components/footer.html');

    console.log("All components loaded, initializing functionality");

    // Initialize other components after all HTML is loaded
    if (typeof initSlider === 'function') initSlider();
    if (typeof initSearch === 'function') initSearch();
    if (typeof initCart === 'function') initCart();
    
    // Initialize featured products first, then regular products
    if (typeof initFeaturedCarousel === 'function') {
        console.log("Initializing featured products");
        initFeaturedCarousel();
    }
    
    if (typeof initProducts === 'function') {
        console.log("Initializing product grid");
        initProducts();
    }
}