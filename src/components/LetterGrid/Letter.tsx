import { useState, useEffect } from "react";
import { UseWord } from "../../context/WordContext";
import "./Letter.css";

interface LetterProps {
  columnNum: number;
  rowNum: number;
}

const Letter: React.FC<LetterProps> = ({ columnNum, rowNum }) => {
  const { state } = UseWord();
  const letter = state.currentBoard[rowNum][columnNum];
  const { wordToGuess } = state;
  const { correctLetters, wrongLetters, misplacedLetters } = state.letters;
  const [isAnimating, setIsAnimating] = useState(false);

  // Determine the status of the letter
  const getStatusColor = () => {
    if (state.checkedRows.includes(rowNum)) {
      // Only color the letter if the row has been checked (i.e., Enter was pressed)
      if (wordToGuess) {
        if (
          correctLetters.includes(letter) &&
          wordToGuess[columnNum] === letter
        ) {
          return "bg-[#528c4d] text-white border-[#528c4d]";
        }

        if (
          misplacedLetters.includes(letter) &&
          wordToGuess.includes(letter) &&
          wordToGuess[columnNum] !== letter
        ) {
          return "bg-[#b59f3c] text-white border-[#b59f3c]";
        }

        if (wrongLetters.includes(letter)) {
          return "bg-[#39393b] text-white border-[#39393b]";
        }
      }
    }
    return "bg-[#121214] border-[#39393b]"; // Default color until Enter is pressed
  };

  useEffect(() => {
    if (letter) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [letter]);

  return (
    <div
      className={`w-14 h-14 flex items-center justify-center mx-1 text-xl font-bold uppercase border-2 ${
        isAnimating ? "animate-populate" : ""
      } ${getStatusColor()}
          `}
    >
      {letter}
    </div>
  );
};

export default Letter;
