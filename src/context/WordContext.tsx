import React, { useContext, createContext, useReducer, ReactNode } from "react";
import {
  Action,
  initialState,
  InitialState,
  GameStatus,
} from "../@types/wordle";

const WordContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const wordReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "SetWord": {
      console.log(action.payload);
      return {
        ...state,
        wordToGuess: action.payload,
      };
    }

    case "MakeGuess": {
      const guessedLetter = action.payload;
      const newBoard = state.currentBoard.map((row) => [...row]);
      const currentRow = state.currentRow;
      const currentColumn = state.currentColumn;
      const allowMoreGuesses = state.allowMoreGuesses;

      // Place the guessed letter
      newBoard[currentRow][currentColumn] = guessedLetter;

      // Determine whether to move to the next row or column
      const isEndOfRow = currentColumn === newBoard[currentRow].length - 1;

      if (isEndOfRow) {
        return {
          ...state,
          currentBoard: newBoard,
          allowMoreGuesses: true,
          currentColumn,
        };
      }

      // Check if guesses are allowed
      if (!allowMoreGuesses) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        currentBoard: newBoard,
        currentColumn: currentColumn + 1, // Move to the next column
      };
    }

    case "DeleteLastGuess": {
      const newBoard = state.currentBoard.map((row) => [...row]);
      const currentRow = state.currentRow;
      let currentColumn = state.currentColumn;

      // Check if the current column is at the start and no letters are present
      if (currentColumn === 0 && newBoard[currentRow][currentColumn] === "") {
        return state; // Nothing to delete if at the start of the row and the cell is empty
      }

      // Adjust the column index to the last filled cell
      if (newBoard[currentRow][currentColumn] === "") {
        currentColumn--; // Move back only if the current cell is empty
      }

      // Remove the letter from the board
      newBoard[currentRow][currentColumn] = "";

      return {
        ...state,
        currentBoard: newBoard,
        currentColumn: currentColumn > 0 ? currentColumn : 0, // Ensure column index doesn't go negative
      };
    }

    case "CheckLastWord": {
      const currentBoard = state.currentBoard;
      const currentRow = state.currentRow;
      const wordToCheck = currentBoard[currentRow].join("");
      const wordToGuess = state.wordToGuess!;

      // Arrays to track feedback
      const wrongLetters = [...state.letters.wrongLetters];
      const correctLetters = [...state.letters.correctLetters];
      const misplacedLetters = [...state.letters.misplacedLetters];

      // Create arrays for feedback for this guess
      const guessFeedback = Array(wordToGuess.length).fill("");

      // Map to track letter occurrences in the wordToGuess
      const letterCount: { [char: string]: number } = {};
      for (const char of wordToGuess) {
        letterCount[char] = (letterCount[char] || 0) + 1;
      }

      // First pass: Check for correct letters in the right position
      for (let i = 0; i < wordToCheck.length; i++) {
        if (wordToCheck[i] === wordToGuess[i]) {
          guessFeedback[i] = "correct";
          letterCount[wordToCheck[i]]--;
          if (!correctLetters.includes(wordToCheck[i])) {
            correctLetters.push(wordToCheck[i]);
          }
        }
      }

      // Second pass: Check for misplaced letters
      for (let i = 0; i < wordToCheck.length; i++) {
        if (
          guessFeedback[i] === "" && // Not already marked as correct
          wordToGuess.includes(wordToCheck[i]) && // Letter is in the wordToGuess
          letterCount[wordToCheck[i]] > 0 // Letter has not been fully used
        ) {
          guessFeedback[i] = "misplaced";
          letterCount[wordToCheck[i]]--;
          if (!misplacedLetters.includes(wordToCheck[i])) {
            misplacedLetters.push(wordToCheck[i]);
          }
        }
      }

      // Third pass: Mark remaining as wrong letters
      for (let i = 0; i < wordToCheck.length; i++) {
        if (guessFeedback[i] === "") {
          guessFeedback[i] = "wrong";
          if (!wrongLetters.includes(wordToCheck[i])) {
            wrongLetters.push(wordToCheck[i]);
          }
        }
      }

      // Check if the word is correct and move to the next state
      const isCorrectWord = wordToCheck === wordToGuess;

      console.log(correctLetters, wrongLetters, misplacedLetters);

      return {
        ...state,
        letters: {
          correctLetters: correctLetters,
          wrongLetters,
          misplacedLetters: misplacedLetters,
        },
        currentRow: isCorrectWord ? currentRow : currentRow + 1,
        currentColumn: 0,
        allowMoreGuesses: !isCorrectWord,
        gameStatus: isCorrectWord
          ? GameStatus.won
          : currentRow + 1 >= currentBoard.length
          ? GameStatus.lost
          : GameStatus.inProgress,
        checkedRows: [...state.checkedRows, currentRow],
      };
    }

    default:
      throw new Error("Unknown action");
  }
};

const WordProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};

const UseWord = () => {
  const context = useContext(WordContext);
  if (context === undefined)
    throw new Error("WordContext was used outside of the WordProvider");
  return context;
};

export { WordProvider, UseWord };
