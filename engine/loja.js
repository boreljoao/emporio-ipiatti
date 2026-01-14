// Loja Angatti - WhatsApp Checkout
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.btn-buy');
    const whatsappNumber = '5521967563261'; // Número do WhatsApp
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            const productCode = this.getAttribute('data-code');
            
            // Criar mensagem para WhatsApp
            const message = `Olá! Gostaria de comprar:\n\n` +
                          `*${productName}*\n` +
                          `Código: ${productCode}\n` +
                          `Preço: R$ ${productPrice.replace('.', ',')}\n\n` +
                          `Podem me ajudar com o pedido?`;
            
            // Codificar mensagem para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Criar link do WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    });
});
