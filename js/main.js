// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load all components
    await loadComponent('header', 'components/header.html');
    await loadComponent('banner', 'components/banner.html');
    await loadComponent('features', 'components/featured.html');
    await loadComponent('products', 'components/products.html');
    await loadComponent('footer', 'components/footer.html');

    // Initialize other components after all HTML is loaded
    // These will be called after the HTML components are loaded
    if (typeof initProducts === 'function') initProducts();
    if (typeof initSlider === 'function') initSlider();
    if (typeof initSearch === 'function') initSearch();
    if (typeof initCart === 'function') initCart();
});