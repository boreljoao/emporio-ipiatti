const hoverText = document.getElementById('sobrenos');
const tooltip = document.getElementById('box_txt');

hoverText.addEventListener('mouseover', () => {
    tooltip.style.display = 'block';
});

hoverText.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
});




// Verificar se há um valor armazenado no localStorage
const navigationHistory = JSON.parse(localStorage.getItem('navigationHistory')) || [];

function navigate(destination) {
    if (!navigationHistory.includes(destination)) {
        navigationHistory.push(destination);
    }
    updateNavigation();
}

function updateNavigation() {
    // Atualizar a interface do usuário ou executar outras ações necessárias
    console.log('Histórico de navegação:', navigationHistory);

    // Armazenar no localStorage com prazo de expiração
    localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
}

// Limpar o histórico de navegação ao fechar o site
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('navigationHistory');
});