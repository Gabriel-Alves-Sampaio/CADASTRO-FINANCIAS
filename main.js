// Array de objetos para armazenar os dados (Critério 4)
var listaFinancas = [];

function salvarGasto() {
    // Captura de dados (Passo a passo recomendado)
    let desc = document.getElementById('descricao').value;
    let preco = document.getElementById('valor').value;
    let cat = document.getElementById('categoria').value;

    // Validação: não permite envio em branco (Critério 3)
    if (desc.trim() !== "" && preco !== "" && cat.trim() !== "") {
        let novoItem = { 
            descricao: desc, 
            valor: parseFloat(preco), 
            categoria: cat 
        };
        
        // Armazenamento no Array
        listaFinancas.push(novoItem);
        
        // Renderização e Cálculos
        atualizarTela();
        
        // Limpa o formulário após o envio (Critério 3)
        document.getElementById('descricao').value = "";
        document.getElementById('valor').value = "";
        document.getElementById('categoria').value = "";
    } else {
        alert("Por favor, preencha todos os campos obrigatórios!");
    }
}

function atualizarTela() {
    // Selecionamos o corpo da tabela (tbody) para manter o cabeçalho fixo no HTML
    let corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ""; // Limpa a lista antes de renderizar
    
    let somaTotal = 0;

    // Função para varrer o Array (Critério 4)
    for (let i = 0; i < listaFinancas.length; i++) {
        let item = listaFinancas[i];
        let linha = document.createElement('tr');

        // Lógica do Alerta Visual: Destaque para valores > 100 (Diferencial)
        if (item.valor > 100) {
            linha.classList.add('gasto-alto');
        }

        // Montagem das células da tabela
        linha.innerHTML = `
            <td>${item.descricao}</td>
            <td>${item.categoria}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td>
                <button class="btn btn-success btn-sm me-2" onclick="editarGasto(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirGasto(${i})">Excluir</button>
            </td>
        `;
        
        corpoTabela.appendChild(linha);
        somaTotal += item.valor;
    }
    
    // Atualiza o painel de Total Gasto (Cálculo Automático)
    document.getElementById('exibirTotal').innerHTML = "R$ " + somaTotal.toFixed(2);
}

// Função de Remoção: deleta do array e recalcula o total (Critério 4)
function excluirGasto(indice) {
    listaFinancas.splice(indice, 1);
    atualizarTela();
}

// Função de Edição (Diferencial adicional)
function editarGasto(indice) {
    let item = listaFinancas[indice];
    
    // Devolve os valores para os inputs para alteração
    document.getElementById('descricao').value = item.descricao;
    document.getElementById('valor').value = item.valor;
    document.getElementById('categoria').value = item.categoria;
    
    // Remove o item antigo para que o novo seja salvo ao clicar em 'Salvar'
    excluirGasto(indice);
}