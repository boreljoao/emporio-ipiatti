// Modal de Loja no Empório
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('storeModal');
    const closeBtn = document.getElementById('closeModal');
    const closeBtnSecondary = document.getElementById('closeModalBtn');
    
    // Verificar se já foi fechado antes (usando localStorage)
    const modalClosed = localStorage.getItem('storeModalClosed');
    
    // Mostrar modal após 2 segundos se não foi fechado antes
    if (!modalClosed) {
        setTimeout(() => {
            modal.classList.add('active');
        }, 2000);
    }
    
    // Fechar modal
    function closeModal() {
        modal.classList.remove('active');
        localStorage.setItem('storeModalClosed', 'true');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (closeBtnSecondary) {
        closeBtnSecondary.addEventListener('click', closeModal);
    }
    
    // Fechar ao clicar no overlay
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('store-modal-overlay')) {
                closeModal();
            }
        });
    }
});
