import { useEffect } from "react";
import Keyboard from "./components/Keyboard/Keyboard";
import LetterGrid from "./components/LetterGrid/LetterGrid";
import { generateWord } from "./services/apiWordGenerator";
import { UseWord } from "./context/WordContext";
import { GameStatus } from "./@types/wordle";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const { dispatch, state } = UseWord();
  const { gameStatus } = state;
  const handleGuessLetter = (letter: string) => {
    const upperCaseLetter = letter.toUpperCase();
    const isLetter = /^[A-Z]$/.test(upperCaseLetter);
    const isBackspace = upperCaseLetter === "BACKSPACE";
    const isEnter = upperCaseLetter === "ENTER";

    if (isLetter) {
      dispatch({ type: "MakeGuess", payload: upperCaseLetter });
    } else if (isBackspace) {
      dispatch({ type: "DeleteLastGuess" });
    } else if (isEnter) {
      dispatch({ type: "CheckLastWord" });
    }
  };

  useEffect(() => {
    const handleGeneratedWord = async () => {
      const tempWord = await generateWord();
      dispatch({ type: "SetWord", payload: tempWord.toUpperCase() });
    };
    const checkStatus = () => {
      if (gameStatus === GameStatus.won) {
        toast.success("You Guessed coreclty");
        console.log(gameStatus);
      } else if (gameStatus === GameStatus.lost) {
        toast.error("Game over. Better luck next time!");
      }
    };
    if (gameStatus !== GameStatus.won && gameStatus !== GameStatus.lost) {
      handleGeneratedWord();
    }
    checkStatus();
  }, [dispatch, gameStatus]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <LetterGrid />
        <Keyboard handleGuessedLetter={handleGuessLetter} />
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
