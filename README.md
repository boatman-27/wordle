# Wordle Clone

A fully functional Wordle clone built with React and TypeScript. This application mimics the popular word puzzle game, allowing users to guess a secret word within a limited number of attempts.

## Features

- **Dynamic Word Generation**: A new word is fetched at the start of each game using an external API.
- **Interactive UI**: A visually appealing grid and keyboard to enhance user experience.
- **Real-Time Feedback**:
  - Correct letters are highlighted in green.
  - Misplaced letters are highlighted in yellow.
  - Wrong letters are grayed out.
- **Game States**:
  - `In Progress`: Active gameplay.
  - `Won`: The user guesses the word correctly.
  - `Lost`: The user exhausts all attempts.
- **Responsive Design**: Optimized for both desktop and mobile screens.
- **Error Handling**: Invalid inputs are gracefully handled.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/boatman-27/wordle
   cd Wordle
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

- Use the on-screen keyboard to input letters or type directly using your physical keyboard.
- Press **Enter** to submit a word and check its accuracy.
- Press **Backspace** to delete the last letter.
- The game provides feedback after each attempt, showing which letters are correct, misplaced, or wrong.

## Technologies Used

- **React**: Front-end library for building UI.
- **TypeScript**: Static typing for better development experience.
- **Tailwind CSS**: For styling and responsiveness.
- **React Hot Toast**: Provides success and error notifications.

## How It Works

1. **Word Setup**: A random word is fetched when the game starts.
2. **User Input**: The user guesses a word by typing or using the on-screen keyboard.
3. **Feedback**: Each guess is evaluated:
   - Letters in the correct position are marked as correct with a green color.
   - Letters in the word but in the wrong position are marked as misplaced with a yellow color.
   - Letters not in the word are marked as wrong with a dark gray color.
4. **Game End**: The game ends when:
   - The user correctly guesses the word.
   - The user runs out of attempts.

## Future Enhancements

- **Custom Word Length**: Allow users to choose the word length.
- **Dark Mode**: Provide a toggle for light and dark themes.
- **Leaderboard**: Track scores and display a leaderboard.
- **Multiplayer Mode**: Compete with friends in real-time.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Inspired by the original Wordle game.
- Special thanks to the developers of the libraries and tools used in this project.
