interface InputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  clearChat: () => void;
  isLoading?: boolean;
  file?: File | null;
  handleFileSelection: (file: File | null) => void;
}

const Input = ({
  input,
  setInput,
  sendMessage,
  clearChat,
  isLoading,
  file,
  handleFileSelection,
}: InputProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-600 rounded-lg text-xs lg:text-base overflow-x-auto overflow-y-hidden">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading) sendMessage();
        }}
        placeholder="Send a message..."
        className="flex-1 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className={`${
          isLoading
            ? "bg-gray-500"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }  px-4 py-2 rounded shadow   duration-200 text-white`}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Send"}
      </button>
      <label
        className={`${
          isLoading
            ? "bg-gray-500"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        } w-30 px-4 py-2 rounded shadow duration-200 text-white flex items-center justify-center gap-2 custom-scroll  whitespace-nowrap`}
      >
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFileSelection(f);
          }}
          disabled={isLoading}
        />
        {file ? file.name : "Upload File"}
      </label>
      {file && (
        <span
          className="text-red-400 font-bold cursor-pointer mr-1"
          onClick={(e) => {
            e.stopPropagation();
            handleFileSelection(null);
          }}
          title="Delete file"
        >
          X
        </span>
      )}
      <button
        onClick={clearChat}
        className={`${
          isLoading
            ? "bg-red-500"
            : "bg-red-600 hover:bg-red-700 cursor-pointer"
        }  px-4 py-2 rounded shadow   duration-200 text-white whitespace-nowrap`}
        disabled={isLoading}
      >
        Clear chat
      </button>
    </div>
  );
};

export default Input;
