import type { BotMessage } from "../../types/types";

const TokenInfo = ({
  promptTokenCount,
  candidatesTokenCount,
  totalTokenCount,
}: BotMessage) => (
  <div className="flex gap-2 mb-1">
    <span className="bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
      input: {promptTokenCount}
    </span>
    <span className="bg-green-800 text-white text-xs px-2 py-1 rounded-full">
      output: {candidatesTokenCount}
    </span>
    <span className="bg-purple-800 text-white text-xs px-2 py-1 rounded-full">
      total: {totalTokenCount}
    </span>
  </div>
);

export default TokenInfo;
