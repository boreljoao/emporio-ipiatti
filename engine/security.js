// Security and Validation System for E-commerce

// Sanitize user input
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
}

// Validate product data
function validateProductData(product) {
    if (!product || typeof product !== 'object') return false;
    
    const required = ['id', 'name', 'price'];
    for (const field of required) {
        if (!product[field]) return false;
    }
    
    // Validate price
    if (typeof product.price !== 'number' || product.price <= 0 || product.price > 10000) {
        return false;
    }
    
    // Validate ID (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(product.id)) {
        return false;
    }
    
    return true;
}

// Validate cart item
function validateCartItem(item) {
    if (!validateProductData(item)) return false;
    
    // Validate quantity
    if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 100) {
        return false;
    }
    
    return true;
}

// Secure localStorage operations
const SecureStorage = {
    set: function(key, value) {
        try {
            const serialized = JSON.stringify(value);
            if (serialized.length > 100000) { // 100KB limit
                console.error('Storage limit exceeded');
                return false;
            }
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            return JSON.parse(item);
        } catch (e) {
            console.error('Storage read error:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }
};

// Rate limiting for cart operations
const RateLimiter = {
    operations: {},
    
    check: function(operation, limit = 10, window = 60000) {
        const now = Date.now();
        const key = operation;
        
        if (!this.operations[key]) {
            this.operations[key] = { count: 1, reset: now + window };
            return true;
        }
        
        if (now > this.operations[key].reset) {
            this.operations[key] = { count: 1, reset: now + window };
            return true;
        }
        
        if (this.operations[key].count >= limit) {
            return false;
        }
        
        this.operations[key].count++;
        return true;
    }
};

// Validate WhatsApp number
function validateWhatsAppNumber(number) {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');
    // Check if it's a valid Brazilian number (10-11 digits) or international
    return cleaned.length >= 10 && cleaned.length <= 15;
}

// Secure URL generation for WhatsApp
function generateSecureWhatsAppURL(number, message) {
    if (!validateWhatsAppNumber(number)) {
        console.error('Invalid WhatsApp number');
        return null;
    }
    
    // Sanitize message
    const sanitized = sanitizeInput(message);
    if (!sanitized || sanitized.length > 4000) {
        console.error('Invalid message');
        return null;
    }
    
    try {
        const encoded = encodeURIComponent(sanitized);
        return `https://wa.me/${number}?text=${encoded}`;
    } catch (e) {
        console.error('URL generation error:', e);
        return null;
    }
}

// Content Security Policy helper
function addSecurityHeaders() {
    // Add meta tag for CSP if not exists
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://wa.me https://api.whatsapp.com;";
        document.head.appendChild(meta);
    }
}

// Initialize security on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSecurityHeaders);
} else {
    addSecurityHeaders();
}

// Export for use in other scripts
window.SecurityUtils = {
    sanitizeInput,
    validateProductData,
    validateCartItem,
    SecureStorage,
    RateLimiter,
    validateWhatsAppNumber,
    generateSecureWhatsAppURL
};
