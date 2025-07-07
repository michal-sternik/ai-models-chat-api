import { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import Input from "../Input/Input";
import { useChat } from "../../hooks/useChat";
import HeaderBar from "../HeaderBar/HeaderBar";

function RootLayout() {
  const [input, setInput] = useState("");

  const [totalTokenSum, setTotalTokenSum] = useState(() =>
    Number(localStorage.getItem("totalTokenCount") || 0)
  );

  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    file,
    handleFileSelection,
    numberOfPreviousMessagesAttached,
    setNumberOfPreviousMessagesAttached,
  } = useChat();

  const resetTokenCount = () => {
    localStorage.setItem("totalTokenCount", "0");
    setTotalTokenSum(0);
  };

  const handleSend = () => {
    sendMessage(input, setInput, file || undefined);
  };

  useEffect(() => {
    setTotalTokenSum(Number(localStorage.getItem("totalTokenCount") || 0));
  }, [messages]);

  return (
    <div className="flex flex-col md:w-2/3 w-full h-screen bg-gray-500 rounded-xl p-4 gap-3">
      <HeaderBar
        numberOfPreviousMessagesAttached={numberOfPreviousMessagesAttached}
        setNumberOfPreviousMessagesAttached={
          setNumberOfPreviousMessagesAttached
        }
        totalTokenSum={totalTokenSum}
        resetTokenCount={resetTokenCount}
      />
      <Input
        input={input}
        setInput={setInput}
        sendMessage={handleSend}
        clearChat={clearChat}
        isLoading={isLoading}
        handleFileSelection={handleFileSelection}
        file={file}
      />
      <hr className="text-black" />
      <Conversation messages={messages} />
      {isLoading && (
        <div className="text-center text-white mt-2 animate-pulse">
          Bot is generating the answer...
        </div>
      )}
    </div>
  );
}

export default RootLayout;
