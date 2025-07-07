interface HeaderBarProps {
  numberOfPreviousMessagesAttached: number;
  setNumberOfPreviousMessagesAttached: (value: number) => void;
  totalTokenSum: number;
  resetTokenCount: () => void;
}

const HeaderBar = ({
  numberOfPreviousMessagesAttached,
  setNumberOfPreviousMessagesAttached,
  totalTokenSum,
  resetTokenCount,
}: HeaderBarProps) => {
  return (
    <>
      <h1 className="block sm:hidden font-bold text-white text-2xl self-center">
        Gemini 2.5 Flash
      </h1>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-xs">
            Context length: {numberOfPreviousMessagesAttached}
          </span>
          <input
            type="range"
            min={0}
            max={50}
            value={numberOfPreviousMessagesAttached}
            onChange={(e) =>
              setNumberOfPreviousMessagesAttached(Number(e.target.value))
            }
            className="accent-blue-500"
          />
        </div>
        <h1 className="hidden sm:block font-bold text-white text-2xl self-center">
          Gemini 2.5 Flash
        </h1>
        <div className="flex items-center gap-2 sm:text-base text-xs ">
          <p>Total tokens used: {totalTokenSum}</p>
          <button
            className=" text-white cursor-pointer bg-red-500 rounded-full w-5 h-5 items-center justify-center flex text-xs hover:bg-red-600"
            title="Reset token count"
            onClick={resetTokenCount}
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
