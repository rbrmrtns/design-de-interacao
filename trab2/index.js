const grid = document.querySelector('.grid');
const pontuacaoTexto = document.querySelector('#pontuacao');
const blocoWidth = 90;
const blocoHeight = 20;
const bolaDiametro = 20;
const quadroWidth = 1020;
const quadroHeight = 500;
let direcaoX = -2;
let direcaoY = 2;

const userInicio = [230, 10];
let posicaoAtual = userInicio;

const bolaInicio = [270, 40];
let bolaPosicaoAtual = bolaInicio;

let timerId;
let pontuacao = 0;

//classe bloco
class Bloco {
  constructor(eixoX, eixoY) {
    this.inferiorEsquerdo = [eixoX, eixoY]
    this.inferiorDireito = [eixoX + blocoWidth, eixoY]
    this.superiorDireito = [eixoX + blocoWidth, eixoY + blocoHeight]
    this.superiorEsquerdo = [eixoX, eixoY + blocoHeight]
  }
};

//todos os blocos
const blocos = [
  new Bloco(10, 360),
  new Bloco(110, 360),
  new Bloco(210, 360),
  new Bloco(310, 360),
  new Bloco(410, 360),
  new Bloco(510, 360),
  new Bloco(610, 360),
  new Bloco(710, 360),
  new Bloco(810, 360),
  new Bloco(910, 360),
  new Bloco(10, 330),
  new Bloco(110, 330),
  new Bloco(210, 330),
  new Bloco(310, 330),
  new Bloco(410, 330),
  new Bloco(510, 330),
  new Bloco(610, 330),
  new Bloco(710, 330),
  new Bloco(810, 330),
  new Bloco(910, 330),
  new Bloco(10, 300),
  new Bloco(110, 300),
  new Bloco(210, 300),
  new Bloco(310, 300),
  new Bloco(410, 300),
  new Bloco(510, 300),
  new Bloco(610, 300),
  new Bloco(710, 300),
  new Bloco(810, 300),
  new Bloco(910, 300),
  new Bloco(10, 270),
  new Bloco(110, 270),
  new Bloco(210, 270),
  new Bloco(310, 270),
  new Bloco(410, 270),
  new Bloco(510, 270),
  new Bloco(610, 270),
  new Bloco(710, 270),
  new Bloco(810, 270),
  new Bloco(910, 270),
  new Bloco(10, 240),
  new Bloco(110, 240),
  new Bloco(210, 240),
  new Bloco(310, 240),
  new Bloco(410, 240),
  new Bloco(510, 240),
  new Bloco(610, 240),
  new Bloco(710, 240),
  new Bloco(810, 240),
  new Bloco(910, 240),
  new Bloco(10, 210),
  new Bloco(110, 210),
  new Bloco(210, 210),
  new Bloco(310, 210),
  new Bloco(410, 210),
  new Bloco(510, 210),
  new Bloco(610, 210),
  new Bloco(710, 210),
  new Bloco(810, 210),
  new Bloco(910, 210),
];

function criarBotaoInicio() {
  const botaoInicio = document.createElement('button');
  botaoInicio.innerHTML = 'Iniciar';
  botaoInicio.classList.add('botaoInicio');
  grid.appendChild(botaoInicio);
  botaoInicio.addEventListener('click', function() {
    botaoInicio.style.display = 'none';
    timerId = setInterval(moverBola, 15);
  })
}
criarBotaoInicio();

function criarBotaoRecarregar() {
  const botaoRecarregar = document.createElement('button');
  botaoRecarregar.innerHTML = 'Tentar Novamente';
  botaoRecarregar.classList.add('botaoRecarregar');
  grid.appendChild(botaoRecarregar);
  botaoRecarregar.addEventListener('click', function() {
    botaoRecarregar.style.display = 'none';
    window.location.reload();
  })
}

//criando os blocos
function criarBlocos() {
  for (let i = 0; i < blocos.length; i++) {
    const bloco = document.createElement('div');
    switch (true) {
      case (i < 20):
        bloco.classList.add('bloco', 'bloco-vermelho');
        break;
      case (i < 40):
        bloco.classList.add('bloco', 'bloco-laranja');
        break;
      default:
        bloco.classList.add('bloco', 'bloco-amarelo');
    }
    bloco.style.left = blocos[i].inferiorEsquerdo[0] + 'px';  
    bloco.style.bottom = blocos[i].inferiorEsquerdo[1] + 'px';  
    grid.appendChild(bloco);
    console.log(blocos[i].inferiorEsquerdo);
  }
};
criarBlocos();

//criando o user
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
criarUser();

//criando a bola
const bola = document.createElement('div');
bola.classList.add('bola');
grid.appendChild(bola);
criarBola();

//mover o user
function moverUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (posicaoAtual[0] - 20 >= 0) {
        posicaoAtual[0] -= 20;
        console.log(posicaoAtual[0] > 0);
        criarUser();
      }
      break;
    case 'ArrowRight':
      if (posicaoAtual[0] + 20 <= (quadroWidth - blocoWidth)) {
        posicaoAtual[0] += 20;
        console.log(posicaoAtual[0]);
        criarUser();
      }
      break;
  }
}
document.addEventListener('keydown', moverUser);

//função criar User
function criarUser() {
  user.style.left = posicaoAtual[0] + 'px';
  user.style.bottom = posicaoAtual[1] + 'px';
}

//função criar Bola
function criarBola() {
  bola.style.left = bolaPosicaoAtual[0] + 'px';
  bola.style.bottom = bolaPosicaoAtual[1] + 'px';
}

//mover a bola
function moverBola() {
    bolaPosicaoAtual[0] += direcaoX;
    bolaPosicaoAtual[1] += direcaoY;
    criarBola();
    checarColisoes();
}

//checar colisões
function checarColisoes() {
  //checar colisões com blocos
  for (let i = 0; i < blocos.length; i++){
    if
    (
      (bolaPosicaoAtual[0] > blocos[i].inferiorEsquerdo[0] && bolaPosicaoAtual[0] < blocos[i].inferiorDireito[0]) &&
      ((bolaPosicaoAtual[1] + bolaDiametro) > blocos[i].inferiorEsquerdo[1] && bolaPosicaoAtual[1] < blocos[i].superiorEsquerdo[1]) 
    )
      {
      const todosBlocos = Array.from(document.querySelectorAll('.bloco'));
      todosBlocos[i].classList.remove('bloco');
      blocos.splice(i, 1);
      mudarDirecao();   
      pontuacao++;
      pontuacaoTexto.innerHTML = 'Pontuação: ' + pontuacao;
      if (blocos.length == 0) {
        pontuacaoTexto.innerHTML = 'Você venceu!';
        clearInterval(timerId);
        document.removeEventListener('keydown', moverUser);
      }
    }
  }
  //checar colisões com a parede
  if (bolaPosicaoAtual[0] >= (quadroWidth - bolaDiametro) || bolaPosicaoAtual[0] <= 0 || bolaPosicaoAtual[1] >= (quadroHeight - bolaDiametro))
  {
    mudarDirecao();
  }

  //checar colisões com o user
  if
  (
    (bolaPosicaoAtual[0] > posicaoAtual[0] && bolaPosicaoAtual[0] < posicaoAtual[0] + blocoWidth) &&
    (bolaPosicaoAtual[1] > posicaoAtual[1] && bolaPosicaoAtual[1] < posicaoAtual[1] + blocoHeight ) 
  )
  {
    mudarDirecao();
  }

  //game over
  if (bolaPosicaoAtual[1] <= 0) {
    clearInterval(timerId)
    pontuacaoTexto.innerHTML = 'Você perdeu!';
    document.removeEventListener('keydown', moverUser);
    criarBotaoRecarregar();
  }
}


function mudarDirecao() {
  if (direcaoX === 2 && direcaoY === 2) {
    direcaoY = -2;
    return;
  }
  if (direcaoX === 2 && direcaoY === -2) {
    direcaoX = -2;
    return;
  }
  if (direcaoX === -2 && direcaoY === -2) {
    direcaoY = 2;
    return;
  }
  if (direcaoX === -2 && direcaoY === 2) {
    direcaoX = 2;
    return;
  }
}
