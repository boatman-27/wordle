import Letter from "./Letter";

const LetterGrid: React.FC = () => {
  const rows = 6;
  const columns = 5;

  let grid = null;

  grid = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className="flex flex-row gap-2">
      {Array.from({ length: columns }, (_, columnIndex) => {
        return (
          <Letter key={columnIndex} rowNum={rowIndex} columnNum={columnIndex} />
        );
      })}
    </div>
  ));

  return <div className="text-white flex flex-col gap-2">{grid}</div>;
};

export default LetterGrid;
