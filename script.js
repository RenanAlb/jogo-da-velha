const spaces = document.querySelectorAll('.obj');
const message = document.querySelector('.message');
const buttonReset = document.querySelector('.reset');
const placarX = document.querySelector('.x');
const placarO = document.querySelector('.o');
let arrayGame = [
  '', '', '',
  '', '', '',
  '', '', ''
];

let cont = 0;
let fimDeJogo = false;
let pontosX = 0;
let pontosO = 0;


const verificarJogo = (jogador) => {
  const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combinacao of combinacoes) {
    const [a, b, c] = combinacao;
    if (arrayGame[a] !== '' && arrayGame[a] === arrayGame[b] && arrayGame[a] === arrayGame[c]) {
      fimDeJogo = true;
      return `${jogador}`;
    }
  }

  if (arrayGame.every(celula => celula !== '')) {
    fimDeJogo = true;
    return 'Deu velha';
  }
};

const marcarSpace = (index, space) => {
  if (arrayGame[index] !== '') {
    message.style.backgroundColor = 'rgb(255, 82, 82)';
    message.innerText = 'Espaço já selecionado!';
  } else {
    if (fimDeJogo == false) {
      cont++
      // Estilo da mensagem
      message.style.backgroundColor = `${cont % 2 == 0 ? 'rgb(80, 106, 255)' : 'rgb(255, 110, 110)'}`;
      const jogador = cont % 2 == 0 ? 'O' : 'X';
      message.innerText = `Vez do jogador ${jogador == 'X' ? 'O' : 'X'}`;

      // Atualizar array e tabuleiro
      arrayGame[index] = jogador;
      space.innerText = arrayGame[index];
      console.log(arrayGame);

      const filterSpacesVazios = arrayGame.filter((e) => e == '');
      const resultado = verificarJogo(jogador);

      if (filterSpacesVazios.length == 0 || resultado !== undefined) {
        message.style.backgroundColor = 'rgb(255, 82, 82)';
        if (resultado == 'X' || resultado == 'O') {
          message.innerText = `Fim de jogo: O jogador ${resultado} venceu!`;
        } else {
          message.innerText = `${resultado}`;
        }

        buttonReset.style.display = 'block';
        if (resultado == 'X') {
          placarX.innerText = `X: ${pontosX = pontosX + 1}`;
        } else if (resultado == 'O') {
          placarO.innerText = `0: ${pontosO = pontosO + 1}`;
        }

      }
    } else {
      spaces.forEach((space, index) => {
        space.addEventListener('click', () => {
          message.style.backgroundColor = 'rgb(255, 82, 82)';
          message.innerText = `Jogo finalizado! Comece um novo!`;

          if (arrayGame[index] == '') {
            space.innerHTML = '';
          }
        });
      });
    }
  }
};

spaces.forEach((space, index) => {
  space.addEventListener('click', () => marcarSpace(index, space));
});

buttonReset.addEventListener('click', () => {
  arrayGame = arrayGame.map((e) => e = '');
  spaces.forEach((space, index) => {
    space.innerHTML = '';
  });
  fimDeJogo = false;
  const jogador = cont % 2 == 0 ? 'O' : 'X';
  message.innerText = `Vez do jogador ${jogador == 'X' ? 'O' : 'X'}`;
  buttonReset.style.display = 'none';
});