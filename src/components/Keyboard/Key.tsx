import { GameStatus } from "../../@types/wordle";
import { UseWord } from "../../context/WordContext";
import { handleKeyPress } from "../../Controllers/keyboard";

interface KeyProps {
  letter: string;
  handleGuessedLetter: (letter: string) => void;
}

const Key: React.FC<KeyProps> = ({ letter, handleGuessedLetter }) => {
  const { state } = UseWord();
  const { letters, gameStatus } = state;

  const getStatusColor = () => {
    if (letters.correctLetters.includes(letter))
      return "bg-[#528c4d] text-white border-[#528c4d]"; // Correct letter
    if (letters.misplacedLetters.includes(letter))
      return "bg-[#b59f3c] text-white border-[#b59f3c]"; // Misplaced letter
    if (letters.wrongLetters.includes(letter))
      return "bg-[#39393b] text-white border-[#39393b]"; // Wrong letter
    return "bg-[#818384] border-[#818384]"; // Default color
  };

  return (
    <div>
      <button
        className={`w-10 h-12 flex items-center justify-center text-lg font-bold uppercase rounded-md cursor-pointer ${getStatusColor()}`}
        onClick={() => handleKeyPress(handleGuessedLetter, undefined, letter)}
        disabled={
          gameStatus === GameStatus.lost || gameStatus === GameStatus.won
        }
      >
        {letter}
      </button>
    </div>
  );
};

export default Key;
