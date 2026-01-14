// Brand Selector Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    const brandSides = document.querySelectorAll('.brand-side');
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Add click handlers (only on desktop)
    brandSides.forEach(side => {
        side.addEventListener('click', function(e) {
            // Don't handle click on mobile - only buttons work
            if (isMobile()) {
                // Allow clicks on buttons to work normally
                if (e.target.closest('.brand-mobile-btn')) {
                    return;
                }
                e.stopPropagation();
                return;
            }
            
            const brand = this.dataset.brand;
            const link = brand === 'emporio' 
                ? this.querySelector('a[href="/emporio.html"]')
                : this.querySelector('a[href="/loja.html"]');
            
            if (link && !link.classList.contains('brand-mobile-btn')) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 200);
            }
        });

        // Add keyboard navigation (only on desktop)
        side.addEventListener('keypress', function(e) {
            if (!isMobile() && (e.key === 'Enter' || e.key === ' ')) {
                this.click();
            }
        });

        // Make focusable (only on desktop)
        if (!isMobile()) {
            side.setAttribute('tabindex', '0');
        }
    });

    // Smooth entrance animation
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, 50);
});
