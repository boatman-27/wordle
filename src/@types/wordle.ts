export enum GameStatus {
  "won",
  "inProgress",
  "lost",
}

// Define the initial state structure
export interface InitialState {
  wordToGuess: string | null;
  currentBoard: string[][];
  currentRow: number;
  currentColumn: number;
  allowMoreGuesses: boolean;
  letters: {
    correctLetters: string[];
    wrongLetters: string[];
    misplacedLetters: string[];
  };
  gameStatus: GameStatus;
  checkedRows: number[];
}

export const initialState: InitialState = {
  wordToGuess: null,
  currentBoard: Array(6).fill(Array(5).fill("")), // 6 rows with 5 empty strings
  currentRow: 0,
  currentColumn: 0,
  allowMoreGuesses: true,
  letters: {
    correctLetters: [],
    wrongLetters: [],
    misplacedLetters: [],
  },
  gameStatus: GameStatus.inProgress,
  checkedRows: [],
};

// Define Action types
export type Action =
  | { type: "SetWord"; payload: string }
  | { type: "MakeGuess"; payload: string }
  | { type: "DeleteLastGuess" }
  | { type: "CheckLastWord" };
