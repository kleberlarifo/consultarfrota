// Carrega os dados do JSON
fetch('dados.json')
    .then(response => response.json())
    .then(dados => {
        window.dadosFrota = dados;
    });

function buscarFrota() {
    const placaDigitada = document.getElementById('placa').value.toUpperCase().trim();
    const resultadoDiv = document.getElementById('resultado');

    if (!placaDigitada) {
        resultadoDiv.textContent = "⚠️ Por favor, digite uma placa!";
        resultadoDiv.style.color = "red";
        return;
    }

    const veiculo = window.dadosFrota.find(item => item.placa === placaDigitada);

    if (veiculo) {
        resultadoDiv.textContent = `Número da Frota: ${veiculo.frota}`;
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.textContent = "Placa não encontrada! Verifique se digitou corretamente.";
        resultadoDiv.style.color = "red";
    }
}