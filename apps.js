const item = document.querySelector("#itemSuperMercado");
const valorItem = document.querySelector("#valordoItem");
const quantidadeItem = document.querySelector("#quantidadeItem");
const itemSelecao = document.querySelector("#tipoItem");
const botaoConcluir = document.querySelector("#concluirCompra");
const botaoDeletar = document.querySelector("#deletarCompra");
const resustadoCompra = document.querySelector(".resustadoCompra");


botaoConcluir.addEventListener('click', () => verificarInformacoes())
botaoDeletar.addEventListener('click', () => deletarCompras())

function verificarInformacoes(){
    if(item.value.length < 4){
        alert('Informe o nome do item!!')
    }else if(Number(valorItem.value) < 1){
        alert('Insira o valor do item!!!')
    }else if(Number(quantidadeItem.value) < 1){
        alert('Insira a quantidade do item que deseja comprar!!')
    }else if(itemSelecao.value == 'selecione'){
        alert('Informe o tipo do item!!!')
    }else {
        executarCompra()
    }

}

function executarCompra(){
    let compra = new Supermercado(item.value, Number(valorItem.value), Number(quantidadeItem.value), itemSelecao.value);
    if(itemSelecao.value == 'Alimento'){
        compra.descontoAlimento();
    }else if(itemSelecao.value == 'Vestuário'){
        compra.descontoVestuario();
    }else if(itemSelecao.value == 'Limpeza'){
        compra.descontoLimpeza();
    }else if(itemSelecao.value == 'Brinquedos'){
        compra.descontoBrinquedos();
    }else if(itemSelecao.value == 'Outros'){
        compra.descontoOutros();
    }
    gerarCompra(compra);
}

function gerarCompra(compra) {
    compra.criarCompra();
}

function deletarCompras(){
    while(resustadoCompra.firstElementChild){
        resustadoCompra.removeChild(resustadoCompra.lastElementChild)
    }
}


class Supermercado {
    item;
    valorItem;
    quantidadeItem;
    itemSelecao;

    constructor(item, valorItem, quantidadeItem, itemSelecao){
        this.item = item;
        this.valorItem = valorItem;
        this.quantidadeItem = quantidadeItem;
        this.itemSelecao = itemSelecao;
    }

    descontoAlimento(){
        this.valorItem = this.valorItem - this.valorItem * 0.15;
    }

    descontoVestuario(){
        this.valorItem = this.valorItem - this.valorItem * 0.10;
    }

    descontoLimpeza(){
        this.valorItem = this.valorItem - this.valorItem * 0.30;
    }

    descontoBrinquedos(){
        this.valorItem = this.valorItem - this.valorItem * 0.25;
    }

    descontoOutros(){
        this.valorItem = this.valorItem - this.valorItem * 0.05;
    }

    criarCompra() {
        const infoCompra = `O item ${this.item} custará R$ ${(this.valorItem * this.quantidadeItem).toFixed(2)}`
        const compraList = document.createElement('div');
        const textCompra = document.createElement('p');
        compraList.classList.add('listaCompra')
        resustadoCompra.appendChild(compraList);
        compraList.appendChild(textCompra);
        textCompra.textContent = infoCompra;
        console.log(infoCompra)
    }

}

window.addEventListener('keypress',(e) => {
    if(e.key === "Enter"){
        verificarInformacoes()
    }
})
