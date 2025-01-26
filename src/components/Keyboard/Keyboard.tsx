import { useEffect, useRef } from "react";
import { handleKeyPress } from "../../Controllers/keyboard";
import Key from "./Key";

interface KeyboardProps {
  handleGuessedLetter: (guessedLetter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ handleGuessedLetter }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"];
  return (
    <div
      onKeyDown={(event) => handleKeyPress(handleGuessedLetter, event)}
      tabIndex={0}
      ref={divRef}
      className="focus:outline-none text-white flex flex-col gap-4 mt-5 items-center justify-center mx-auto"
    >
      <div className="flex flex-row gap-3 items-center justify-centers">
        {line1.map((letter, index) => (
          <Key
            key={index}
            letter={letter}
            handleGuessedLetter={() => handleGuessedLetter(letter)}
          />
        ))}
      </div>
      <div className="flex flex-row gap-3 items-center justify-centers">
        {line2.map((letter, index) => (
          <Key
            key={index}
            letter={letter}
            handleGuessedLetter={() => handleGuessedLetter(letter)}
          />
        ))}
      </div>
      <div className="flex flex-row gap-3">
        <button
          className="w-full h-12 flex items-center justify-center text-lg font-bold bg-[#818384] uppercase p-2 rounded-md"
          onClick={() =>
            handleKeyPress(handleGuessedLetter, undefined, "Enter")
          }
        >
          ENTER
        </button>
        <div className="flex flex-row gap-3 items-center justify-centers">
          {line3.map((letter, index) => (
            <Key
              key={index}
              letter={letter}
              handleGuessedLetter={() => handleGuessedLetter(letter)}
            />
          ))}
        </div>
        <button
          className="w-full h-12 flex items-center justify-center text-xl font-bold bg-[#818384] uppercase p-4 rounded-md"
          onClick={() =>
            handleKeyPress(handleGuessedLetter, undefined, "Backspace")
          }
        >
          <svg
            fill="#fff"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            width="24"
            height="24"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M14.6 2.5H4.49a1.25 1.25 0 0 0-1 .51L.39 7.26a1.26 1.26 0 0 0 0 1.48L3.48 13a1.26 1.26 0 0 0 1 .51H14.6a1.25 1.25 0 0 0 1.25-1.25V3.75A1.25 1.25 0 0 0 14.6 2.5zm0 9.75H4.49L1.4 8l3.09-4.25H14.6z"></path>
              <path d="m7.86 10.55 1.99-1.72 1.99 1.72.82-.94L10.81 8l1.85-1.61-.82-.94-1.99 1.72-1.99-1.72-.82.94L8.9 8 7.04 9.61l.82.94z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
