var listaFinancas = [];

function salvarGasto() {
    let desc = document.getElementById('descricao').value;
    let preco = document.getElementById('valor').value;
    let cat = document.getElementById('categoria').value;

    if (desc && preco && cat) {
        let novoItem = { 
            descricao: desc, 
            valor: preco, 
            categoria: cat 
        };
        
        listaFinancas.push(novoItem);
        atualizarTela();
        
        // Limpa o formulário após salvar
        document.getElementById('descricao').value = "";
        document.getElementById('valor').value = "";
        document.getElementById('categoria').value = "";
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

function atualizarTela() {
    // Reseta o cabeçalho da tabela antes de reconstruir
    let tabela = document.getElementById('tabela').innerHTML = "<tr><th>Descrição</th><th>Categoria</th><th>Valor</th><th>Ações</th></tr>";
    let somaTotal = 0;

    for (let i = 0; i <= (listaFinancas.length - 1); i++) {
        let destaque = "";
        // Se o valor for maior que 100, aplica a classe vermelha
        if (parseFloat(listaFinancas[i].valor) > 100) {
            destaque = "class='gasto-alto'";
        }

        tabela += "<tr " + destaque + ">" +
                    "<td>" + listaFinancas[i].descricao + "</td>" +
                    "<td>" + listaFinancas[i].categoria + "</td>" +
                    "<td>R$ " + parseFloat(listaFinancas[i].valor).toFixed(2) + "</td>" +
                    "<td>" +
                        "<button class='btn btn-success btn-sm me-2' onclick='editarGasto(this.parentNode.parentNode.rowIndex)'>Editar</button>" +
                        "<button class='btn btn-danger btn-sm' onclick='excluirGasto(this.parentNode.parentNode.rowIndex)'>Excluir</button>" +
                    "</td>" +
                  "</tr>";
        
        somaTotal += parseFloat(listaFinancas[i].valor);
    }
    
    document.getElementById('tabela').innerHTML = tabela;
    document.getElementById('exibirTotal').innerHTML = "R$ " + somaTotal.toFixed(2);
}

function editarGasto(i) {
    // Volta os dados para os inputs (i-1 porque a linha 0 é o cabeçalho)
    document.getElementById('descricao').value = listaFinancas[i - 1].descricao;
    document.getElementById('valor').value = listaFinancas[i - 1].valor;
    document.getElementById('categoria').value = listaFinancas[i - 1].categoria;
    
    // Remove o item antigo do array
    listaFinancas.splice(i - 1, 1);
    atualizarTela();
}

function excluirGasto(i) {
    // Remove do array usando o índice da linha
    listaFinancas.splice(i - 1, 1);
    atualizarTela();
}