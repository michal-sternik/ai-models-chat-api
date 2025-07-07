import { useRef, useEffect } from "react";
import type { Message, BotMessage } from "../../types/types";
import ReactMarkdown from "react-markdown";
import TokenInfo from "../TokenInfo/TokenInfo";

interface ConversationProps {
  messages: Message[];
}

const Conversation = ({ messages }: ConversationProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-700 rounded-lg w-full h-full custom-scroll overflow-y-auto">
      {messages.map((msg) => (
        <div className="flex flex-row" key={msg.id}>
          <p>
            {(() => {
              const date = new Date(msg.timestamp);
              return date.toLocaleTimeString("pl-PL", { hour12: false });
            })()}
          </p>
          <div className="flex flex-col gap-2 ml-2 w-full">
            <div style={{ color: msg.sender === "user" ? "cyan" : "white" }}>
              <b>{msg.sender === "user" ? "You: " : "Bot: "}</b>

              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>

            {msg.sender === "bot" &&
              (msg as BotMessage).totalTokenCount !== undefined && (
                <TokenInfo {...(msg as BotMessage)} />
              )}
            <hr />
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Conversation;
