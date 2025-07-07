import { useEffect, useRef, useState } from "react";
import { deleteAllGeminiFiles, sendGeminiMessage } from "../api/geminiService";
import type { Message } from "../types/types";
import { generateId } from "../lib/utils/generateId";
import { SAVE_MAX_MESSAGES } from "../lib/constants/constants";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialLoad = useRef(true);
  const [file, setFile] = useState<File | null>(null);
  const [
    numberOfPreviousMessagesAttached,
    setNumberOfPreviousMessagesAttached,
  ] = useState<number>(SAVE_MAX_MESSAGES);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  //we have to use useRef to avoid saving the empty state on the first render
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (
    input: string,
    setInput: (string: string) => void,
    file?: File
  ) => {
    if ((!input.trim() && !file) || isLoading) return;
    setIsLoading(true);
    setInput("");

    const userMsg: Message = {
      id: generateId(),
      sender: "user",
      text: file ? `file: ${file.name}; ${input}` : input,
      timestamp: Date.now(),
    };
    console.log("Sending message:", userMsg);
    setMessages((msgs) => [...msgs, userMsg]);

    try {
      const botMsg = await sendGeminiMessage(
        messages,
        input,
        numberOfPreviousMessagesAttached,
        file || undefined
      );
      setMessages((msgs) => [...msgs, botMsg]);
      if (file) {
        handleFileSelection(null);
      }
      localStorage.setItem(
        "totalTokenCount",
        (
          (Number(localStorage.getItem("totalTokenCount")) || 0) +
          botMsg.totalTokenCount
        ).toString()
      );
    } catch (e) {
      const errorMsg: Message = {
        id: generateId(),
        sender: "bot",
        text: `Błąd: ${e instanceof Error ? e.message : String(e)}`,
        timestamp: Date.now(),
      };
      setMessages((msgs) => [...msgs, errorMsg]);
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setFile(null);
    localStorage.removeItem("chatMessages");
    deleteAllGeminiFiles();
    setNumberOfPreviousMessagesAttached(SAVE_MAX_MESSAGES);
  };

  const handleFileSelection = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    file,
    handleFileSelection,
    numberOfPreviousMessagesAttached,
    setNumberOfPreviousMessagesAttached,
  };
};
