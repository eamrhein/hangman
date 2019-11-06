import React, {useState} from "react";
import step0 from './imgs/0.jpg';
import step1 from './imgs/1.jpg';
import step2 from './imgs/2.jpg';
import step3 from './imgs/3.jpg';
import step4 from './imgs/4.jpg';
import step5 from './imgs/5.jpg';
import step6 from './imgs/6.jpg';

const Hangman = () => {
  const [words] = useState([
    'python',
    'javascript',
    'ruby',
    'haskell',
    'java',
    'lisp',
    'cobol',
    'algol',
    'basic',
    'assembler',
    'fortran',
    'visualbasic'

  ]);
  const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }
  const [defaults] = useState({
    maxTries: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  });

  const[playerState, setPlayerState] = useState({
    mistakes: 0,
    guessed: new Set(),
    answer: randomWord()
  })

  const guessed = () => {
    return playerState.answer.split("")
      .map(correct => (playerState.guessed.has(correct) ? correct : '_'))
  }

  const guessHandler = (e) => {
    let letter = e.target.value;
    setPlayerState(st =>({
      answer: st.answer,
      guessed: st.guessed.add(letter),
      mistakes: st.mistakes + (st.answer.includes(letter) ? 0 : 1)
    }))
  }

  const generateLetters = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
          key={letter}
          value={letter}
          onClick={guessHandler}
          disabled={playerState.guessed.has(letter)}
      >
        {letter}
      </button>
    ))
  }

  const resetGame = () => {
    setPlayerState({
      mistakes: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }
  const gameOver = playerState.mistakes >= defaults.maxTries;
  const altText = `${playerState.mistakes} / ${defaults.maxTries}}`;
  const isWinner = guessed().join("") === playerState.answer;
  let gameState = generateLetters();
  if (isWinner) {
    gameState = "Win!"
  }
  if (gameOver) {
    gameState = "Loss!"
  }
  return (
    <div className='Hangman'>
      <span>Guessed wrong: {playerState.mistakes}</span>
      <p>
        <img src={defaults.images[playerState.mistakes]} alt={altText} />
      </p>
      <p>Guess the Programming Language ?</p>
      <p>
        {!gameOver ? guessed() : playerState.answer}{" "}
      </p>
      <p>{gameState}</p>
      <div>
        <p>
          <button onClick={resetGame}>
            Reset
					</button>
        </p>
      </div>
    </div>
  );
}

export default Hangman;

