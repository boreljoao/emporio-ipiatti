// Product Modal System - Professional E-commerce
const productData = {
    'talharim-aipim': {
        id: 'talharim-aipim',
        name: 'Talharim de Aipim',
        price: 24.90,
        code: '7898974404XXX',
        weight: '300g',
        description: 'Fonte de proteínas e fibras naturais. Composição: Farinha de aipim, arroz, milho e grão de bico. Insumo da agricultura familiar de Maricá.',
        image: 'Talharim_Aipim.webp',
        category: 'Talharim Proteico',
        rating: 4.8,
        reviews: 127,
        ingredients: ['Farinha de aipim', 'Arroz', 'Milho', 'Grão de bico'],
        benefits: ['Fonte de proteínas', 'Rico em fibras', 'Sem glúten', 'Agricultura familiar'],
        testimonials: [
            { author: 'Ana Paula', rating: 5, text: 'Delicioso! Minha família adorou. Textura perfeita e sabor incrível.' },
            { author: 'Roberto Silva', rating: 5, text: 'Melhor massa sem glúten que já provei. Recomendo!' },
            { author: 'Maria Santos', rating: 4, text: 'Muito boa qualidade. Entrega rápida e produto fresco.' }
        ]
    },
    'talharim-guandu': {
        id: 'talharim-guandu',
        name: 'Talharim de Feijão Guandu',
        price: 24.90,
        code: '7898974404XXX',
        weight: '300g',
        description: 'Alta proteína vegetal. Composição: Farinha de feijão guandu e arroz. Insumo da agricultura familiar de Maricá.',
        image: 'Talharim_Feijão Guandu.webp',
        category: 'Talharim Proteico',
        rating: 4.9,
        reviews: 98,
        ingredients: ['Farinha de feijão guandu', 'Arroz'],
        benefits: ['Alta proteína vegetal', 'Sem glúten', 'Agricultura familiar', 'Rico em ferro'],
        testimonials: [
            { author: 'Carlos Mendes', rating: 5, text: 'Excelente para quem busca mais proteína. Sabor único!' },
            { author: 'Juliana Costa', rating: 5, text: 'Perfeito para minha dieta vegana. Super recomendo!' }
        ]
    },
    'talharim-taioba': {
        id: 'talharim-taioba',
        name: 'Talharim de Taioba',
        price: 24.90,
        code: '7898974404XXX',
        weight: '300g',
        description: 'Rico em fibras e nutrientes. Composição: Farinha de taioba, arroz integral e amaranto. Insumo da agricultura familiar de Maricá.',
        image: 'Talharim_Taioba.webp',
        category: 'Talharim Proteico',
        rating: 4.7,
        reviews: 85,
        ingredients: ['Farinha de taioba', 'Arroz integral', 'Amaranto'],
        benefits: ['Rico em fibras', 'Sem glúten', 'Agricultura familiar', 'Nutrientes essenciais'],
        testimonials: [
            { author: 'Fernanda Lima', rating: 5, text: 'Adorei! Muito nutritivo e saboroso.' }
        ]
    },
    'farinha-aipim': {
        id: 'farinha-aipim',
        name: 'Farinha de Aipim',
        price: 18.90,
        code: '7898974404XXX',
        weight: '500g',
        description: '100% natural e sem glúten. Alta concentração de fibras. Versátil para diversas receitas. Origem: Agricultura familiar - Maricá/RJ.',
        image: 'Farinha Aipim.webp',
        category: 'Farinhas Funcionais',
        rating: 4.8,
        reviews: 156,
        ingredients: ['Farinha de aipim 100%'],
        benefits: ['100% natural', 'Alta em fibras', 'Sem glúten', 'Versátil'],
        testimonials: [
            { author: 'Patricia Alves', rating: 5, text: 'Uso em todas as minhas receitas. Qualidade excelente!' }
        ]
    },
    'farinha-batata-doce': {
        id: 'farinha-batata-doce',
        name: 'Farinha de Batata Doce',
        price: 19.90,
        code: '7898974404114',
        weight: '500g',
        description: 'Naturalmente sem glúten. Baixo índice glicêmico. Rica em vitamina A. Origem: Agricultura familiar - Maricá/RJ.',
        image: 'Farinha Batata-Doce.webp',
        category: 'Farinhas Funcionais',
        rating: 4.9,
        reviews: 142,
        ingredients: ['Farinha de batata doce 100%'],
        benefits: ['Baixo índice glicêmico', 'Rica em vitamina A', 'Sem glúten', 'Natural'],
        testimonials: [
            { author: 'Ricardo Souza', rating: 5, text: 'Perfeita para minha dieta. Baixo índice glicêmico é um diferencial!' }
        ]
    },
    'farinha-banana': {
        id: 'farinha-banana',
        name: 'Farinha de Banana Verde',
        price: 19.90,
        code: '7898974404XXX',
        weight: '500g',
        description: 'Fonte de amido resistente. Auxilia na saúde intestinal. Zero glúten. Origem: Agricultura familiar - Maricá/RJ.',
        image: 'Farinha Banana Verde.webp',
        category: 'Farinhas Funcionais',
        rating: 4.9,
        reviews: 203,
        ingredients: ['Farinha de banana verde 100%'],
        benefits: ['Amido resistente', 'Saúde intestinal', 'Sem glúten', 'Natural'],
        testimonials: [
            { author: 'Lucia Ferreira', rating: 5, text: 'Ajudou muito minha digestão. Produto de qualidade!' }
        ]
    },
    'farinha-guandu': {
        id: 'farinha-guandu',
        name: 'Farinha de Feijão Guandu',
        price: 19.90,
        code: '7898974404091',
        weight: '500g',
        description: 'Alta proteína vegetal. Rica em ferro e fibras. Isenta de glúten. Origem: Agricultura familiar - Maricá/RJ.',
        image: 'Farinha Feijao Guandu.webp',
        category: 'Farinhas Funcionais',
        rating: 4.8,
        reviews: 118,
        ingredients: ['Farinha de feijão guandu 100%'],
        benefits: ['Alta proteína', 'Rica em ferro', 'Sem glúten', 'Natural'],
        testimonials: [
            { author: 'Marcos Oliveira', rating: 5, text: 'Excelente fonte de proteína vegetal. Uso diariamente!' }
        ]
    },
    'mix-aipim': {
        id: 'mix-aipim',
        name: 'Mistura para Bolo com Farinha de Aipim',
        price: 28.90,
        code: '7898974404053',
        weight: '840g',
        description: 'Faz 2 receitas. Prática e deliciosa. Totalmente sem glúten. Ingredientes da agricultura familiar.',
        image: 'Mix Bolo Tradicional.webp',
        category: 'Mistura para Bolo',
        rating: 4.9,
        reviews: 189,
        ingredients: ['Farinha de aipim', 'Açúcar', 'Fermento', 'Outros ingredientes naturais'],
        benefits: ['Faz 2 receitas', 'Sem glúten', 'Prática', 'Deliciosa'],
        testimonials: [
            { author: 'Sandra Martins', rating: 5, text: 'Bolos ficam perfeitos! Minha família adora. Vale muito a pena!' }
        ]
    },
    'mix-guandu': {
        id: 'mix-guandu',
        name: 'Mistura para Bolo com Farinha de Guandu',
        price: 28.90,
        code: '7898974404046',
        weight: '840g',
        description: 'Faz 2 receitas. Rica em proteínas. Totalmente sem glúten. Ingredientes da agricultura familiar.',
        image: 'Mix Bolo Feijao-Guandu .webp',
        category: 'Mistura para Bolo',
        rating: 4.8,
        reviews: 167,
        ingredients: ['Farinha de guandu', 'Açúcar', 'Fermento', 'Outros ingredientes naturais'],
        benefits: ['Faz 2 receitas', 'Rica em proteínas', 'Sem glúten', 'Prática'],
        testimonials: [
            { author: 'Paulo Rodrigues', rating: 5, text: 'Bolo proteico delicioso! Perfeito para quem treina.' }
        ]
    }
};

function openProductModal(productId) {
    const product = productData[productId];
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('productModalBody');
    
    // Generate stars HTML
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let html = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                html += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }
        return html;
    }

    // Generate testimonials HTML
    function generateTestimonials(testimonials) {
        if (!testimonials || testimonials.length === 0) return '';
        return testimonials.map(t => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${t.author}</span>
                    <span class="review-date">Há 2 semanas</span>
                </div>
                <div class="review-rating">
                    ${generateStars(t.rating)}
                </div>
                <p class="review-text">"${t.text}"</p>
            </div>
        `).join('');
    }

    modalBody.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="/assets/media/photos/linha-raiz/${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="product-detail-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <div class="rating-info">
                        <span class="rating-value">${product.rating}</span>
                        <span class="reviews-count">${product.reviews} avaliações</span>
                    </div>
                </div>
                <div class="product-detail-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-specs">
                    <h3>Especificações</h3>
                    <ul>
                        <li><span>Peso:</span> <strong>${product.weight}</strong></li>
                        <li><span>Código:</span> <strong>${product.code}</strong></li>
                        <li><span>Categoria:</span> <strong>${product.category}</strong></li>
                    </ul>
                </div>
                <div class="product-detail-specs">
                    <h3>Benefícios</h3>
                    <ul>
                        ${product.benefits.map(b => `<li><i class="fas fa-check-circle" style="color: #25D366;"></i> ${b}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-detail-actions">
                    <button class="btn-buy-now" onclick="buyNow('${product.id}')">
                        <i class="fas fa-credit-card"></i>
                        Comprar Agora
                    </button>
                    <button class="btn-add-cart-modal" onclick="addToCartFromModal('${product.id}')">
                        <i class="fas fa-cart-plus"></i>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
        <div class="product-reviews">
            <h3>Avaliações dos Clientes (${product.reviews})</h3>
            ${generateTestimonials(product.testimonials)}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function buyNow(productId) {
    // Mostrar modal de manutenção ao invés de processar compra
    // Usar a mesma função do loja-cart.js se disponível, senão criar modal diretamente
    if (typeof showMaintenanceModal === 'function') {
        showMaintenanceModal();
    } else {
        const maintenanceModal = document.getElementById('maintenanceModal');
        if (maintenanceModal) {
            maintenanceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function addToCartFromModal(productId) {
    const product = productData[productId];
    if (!product) return;

    // Use existing cart system
    if (typeof window.addToCart === 'function') {
        window.addToCart(product);
    } else {
        // Fallback: trigger click on add cart button
        const event = new CustomEvent('addToCart', { detail: product });
        window.dispatchEvent(event);
    }
}

function addToCartFromCard(button) {
    const productCard = button.closest('.product-card');
    const productDataAttr = productCard.getAttribute('data-product');
    if (productDataAttr) {
        const product = JSON.parse(productDataAttr);
        const productId = product.id;
        addToCartFromModal(productId);
    }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeProductModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('product-modal-overlay')) {
                closeProductModal();
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
});
