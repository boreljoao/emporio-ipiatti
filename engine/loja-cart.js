// Sistema de Carrinho - Loja Angatti (Secure)
let cart = [];
try {
    const stored = localStorage.getItem('angattiCart');
    if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            // Validate all items
            cart = parsed.filter(item => {
                if (!item || typeof item !== 'object') return false;
                if (typeof item.price !== 'number' || item.price <= 0) return false;
                if (typeof item.quantity !== 'number' || item.quantity < 1) return false;
                return true;
            });
        }
    }
} catch (e) {
    console.error('Error loading cart:', e);
    cart = [];
}

document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    const cartFloatBtn = document.getElementById('cartFloatBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartFloatBadge = document.getElementById('cartFloatBadge');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const payNowBtn = document.getElementById('payNowBtn');
    const addCartButtons = document.querySelectorAll('.btn-add-cart');

    // Atualizar badge do carrinho
    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
            if (totalItems > 0) {
                cartBadge.classList.add('show');
            } else {
                cartBadge.classList.remove('show');
            }
        }
        if (cartFloatBadge) {
            cartFloatBadge.textContent = totalItems;
            cartFloatBadge.style.display = totalItems > 0 ? 'flex' : 'none';
            if (totalItems > 0) {
                cartFloatBadge.classList.add('show');
            } else {
                cartFloatBadge.classList.remove('show');
            }
        }
    }

    // Renderizar itens do carrinho
    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            if (payNowBtn) payNowBtn.disabled = true;
            updateTotal();
            return;
        }

        checkoutBtn.disabled = false;
        if (payNowBtn) payNowBtn.disabled = false;
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="/assets/media/photos/linha-raiz/${getProductImage(item.id)}.webp" alt="${item.name}" class="cart-item-image" onerror="this.src='/assets/media/logos/ANGATTI_logo_BRANCO.png'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-specs">${item.weight} · Cód. ${item.code}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-item-quantity">
                        <button class="cart-item-btn" onclick="decreaseQuantity(${index})">-</button>
                        <span class="cart-item-quantity-value">${item.quantity}</span>
                        <button class="cart-item-btn" onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        updateTotal();
    }

    // Obter imagem do produto
    function getProductImage(id) {
        const imageMap = {
            'talharim-aipim': 'Talharim_Aipim',
            'talharim-guandu': 'Talharim_Feijão Guandu',
            'talharim-taioba': 'Talharim_Taioba',
            'farinha-aipim': 'Farinha Aipim',
            'farinha-batata-doce': 'Farinha Batata-Doce',
            'farinha-banana': 'Farinha Banana Verde',
            'farinha-guandu': 'Farinha Feijao Guandu',
            'mix-aipim': 'Mix Bolo Tradicional',
            'mix-guandu': 'Mix Bolo Feijao-Guandu '
        };
        return imageMap[id] || 'ANGATTI_logo_BRANCO';
    }

    // Atualizar total
    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.querySelector('.cart-total-value');
        if (totalElement) {
            totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

    // Adicionar ao carrinho (Secure)
    addCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Rate limiting
            if (window.SecurityUtils && !window.SecurityUtils.RateLimiter.check('addToCart', 20, 60000)) {
                alert('Muitas operações. Aguarde um momento.');
                return;
            }
            
            try {
                const productCard = this.closest('.product-card');
                if (!productCard) return;
                
                const productDataAttr = productCard.getAttribute('data-product');
                if (!productDataAttr) return;
                
                const productData = JSON.parse(productDataAttr);
                
                // Validate product data
                if (window.SecurityUtils && !window.SecurityUtils.validateProductData(productData)) {
                    console.error('Invalid product data');
                    return;
                }
                
                // Verificar se já existe no carrinho
                const existingItem = cart.find(item => item.id === productData.id);
                
                if (existingItem) {
                    if (existingItem.quantity >= 100) {
                        alert('Quantidade máxima atingida para este produto.');
                        return;
                    }
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...productData,
                        quantity: 1
                    });
                }
                
                // Validate cart size
                if (cart.length > 50) {
                    alert('Carrinho cheio. Remova alguns itens antes de adicionar mais.');
                    cart.pop();
                    return;
                }
                
                // Salvar no localStorage (secure)
                try {
                    localStorage.setItem('angattiCart', JSON.stringify(cart));
                } catch (storageError) {
                    console.error('Storage error:', storageError);
                    alert('Erro ao salvar carrinho. Tente novamente.');
                    return;
                }
                
                // Atualizar UI
                updateCartBadge();
                renderCart();
                
                // Feedback visual
                const originalHTML = this.innerHTML;
                const originalBg = this.style.background;
                this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                this.style.background = '#25D366';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = originalBg;
                }, 1500);
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Erro ao adicionar produto. Tente novamente.');
            }
        });
    });

    // Função para abrir carrinho
    function openCart() {
        renderCart();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Abrir carrinho - Header button
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Abrir carrinho - Floating button (Mobile)
    if (cartFloatBtn) {
        cartFloatBtn.addEventListener('click', openCart);
    }

    // Fechar carrinho
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fechar ao clicar no overlay
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal || e.target.classList.contains('cart-modal-overlay')) {
                cartModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Aumentar quantidade
    window.increaseQuantity = function(index) {
        cart[index].quantity += 1;
        localStorage.setItem('angattiCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    };

    // Diminuir quantidade
    window.decreaseQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('angattiCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    };

    // Remover do carrinho
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('angattiCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    };

    // Generate WhatsApp message
    function generateWhatsAppMessage() {
        if (cart.length === 0) return '';

        const whatsappNumber = '5521967563261';
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let message = `*PEDIDO - LOJA ANGATTI*\n\n`;
        message += `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
        
        cart.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `   Quantidade: ${item.quantity}x\n`;
            if (item.weight) message += `   Peso: ${item.weight}\n`;
            if (item.code) message += `   Código: ${item.code}\n`;
            message += `   Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
            message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
        });
        
        message += `━━━━━━━━━━━━━━━━━━━━\n`;
        message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
        message += `Por favor, confirme a disponibilidade e me informe sobre formas de pagamento e entrega.\n\n`;
        message += `Obrigado!`;
        
        return message;
    }

    // Função para mostrar modal de manutenção (global)
    window.showMaintenanceModal = function() {
        const maintenanceModal = document.getElementById('maintenanceModal');
        if (maintenanceModal) {
            maintenanceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Função para fechar modal de manutenção
    function closeMaintenanceModal() {
        const maintenanceModal = document.getElementById('maintenanceModal');
        if (maintenanceModal) {
            maintenanceModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Configurar eventos do modal de manutenção (apenas uma vez)
    const closeMaintenanceModalBtn = document.getElementById('closeMaintenanceModal');
    const maintenanceModal = document.getElementById('maintenanceModal');
    
    if (closeMaintenanceModalBtn) {
        closeMaintenanceModalBtn.addEventListener('click', closeMaintenanceModal);
    }

    if (maintenanceModal) {
        // Fechar ao clicar no overlay
        maintenanceModal.addEventListener('click', function(e) {
            if (e.target === maintenanceModal || e.target.classList.contains('maintenance-modal-overlay')) {
                closeMaintenanceModal();
            }
        });

        // Fechar com tecla ESC (usando uma flag para evitar múltiplos listeners)
        if (!window.maintenanceModalEscListener) {
            window.maintenanceModalEscListener = function(e) {
                if (e.key === 'Escape' || e.keyCode === 27) {
                    const modal = document.getElementById('maintenanceModal');
                    if (modal && modal.classList.contains('active')) {
                        closeMaintenanceModal();
                    }
                }
            };
            document.addEventListener('keydown', window.maintenanceModalEscListener);
        }
    }

    // Checkout via WhatsApp - Interceptado para mostrar modal de manutenção
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) return;
            
            // Mostrar modal de manutenção
            showMaintenanceModal();
        });
    }

    // Pay Now - Interceptado para mostrar modal de manutenção
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) return;
            
            // Mostrar modal de manutenção
            showMaintenanceModal();
        });
    }

    // Inicializar
    updateCartBadge();
    renderCart();
});
