let dadosFrota = [];

// Carrega os dados quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});

async function carregarDados() {
    const loading = document.getElementById('loading');
    const resultado = document.getElementById('resultado');
    
    try {
        loading.style.display = 'block';
        resultado.innerHTML = '';
        
        const response = await fetch('dados.json');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        
        dadosFrota = await response.json();
        console.log('Dados carregados com sucesso:', dadosFrota);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        resultado.innerHTML = `
            <div class="error">
                Erro ao carregar dados da frota. Recarregue a página.
            </div>
        `;
    } finally {
        loading.style.display = 'none';
    }
}

function buscarFrota() {
    const numeroFrota = document.getElementById('numeroFrota').value.trim();
    const resultado = document.getElementById('resultado');
    
    // Validação do input
    if (!numeroFrota) {
        resultado.innerHTML = `
            <div class="error">
                Por favor, digite um número de frota.
            </div>
        `;
        return;
    }
    
    if (dadosFrota.length === 0) {
        resultado.innerHTML = `
            <div class="error">
                Dados não carregados. Aguarde ou recarregue a página.
            </div>
        `;
        return;
    }
    
    // Busca a frota
    const encontrado = dadosFrota.find(item => item.frota === numeroFrota);
    
    if (encontrado) {
        resultado.innerHTML = `
            <div class="success">
                <h3>Resultado da Busca</h3>
                <p><strong>Frota:</strong> ${encontrado.frota}</p>
                <p><strong>Placa:</strong> ${encontrado.placa}</p>
                <p class="timestamp">Consulta realizada em: ${new Date().toLocaleString()}</p>
            </div>
        `;
    } else {
        resultado.innerHTML = `
            <div class="error">
                Frota <strong>${numeroFrota}</strong> não encontrada.
            </div>
        `;
    }
}

function limparResultado() {
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('numeroFrota').value = '';
    document.getElementById('numeroFrota').focus();
}
