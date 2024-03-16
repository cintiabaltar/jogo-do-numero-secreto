//lista de números sorteados para não repetir
let listaDeNumeros = [];
let numeroMaximo = 100;

//variáveis
let numeroSecreto = numeroAleatorio();
let tentativas = 1;


mensagemInicial();

//Criando função para exibir texto no HTML
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//Chamando a função na mensagem de começo de jogo
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

//Gerando número aleatório
function numeroAleatorio() {
   let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeDeElementos = listaDeNumeros.length;
   if(quantidadeDeElementos == numeroMaximo){
        listaDeNumeros = [];
   }
   if(listaDeNumeros.includes(numeroSorteado)){
        return numeroAleatorio();
    } else {
        listaDeNumeros.push(numeroSorteado);
        return numeroSorteado;
    } 
}

//Deixando o campo limpo após tentativa
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Função que reinicia o jogo
function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

//Verificando o chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Uau, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else{
                exibirTextoNaTela('p', 'O número secreto é maior!');
            }
            tentativas++;
            limparCampo();
    } 
}