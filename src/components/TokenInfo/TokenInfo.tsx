import type { BotMessage } from "../../types/types";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";

const TokenInfo = ({
  promptTokenCount,
  candidatesTokenCount,
  totalTokenCount,
}: BotMessage) => (
  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
    <Badge
      variant="secondary"
      className="bg-blue-500/20 text-blue-200 border-blue-500/30 text-xs"
    >
      <ArrowRight className="w-3 h-3 mr-1" />
      Input: {promptTokenCount}
    </Badge>
    <Badge
      variant="secondary"
      className="bg-green-500/20 text-green-200 border-green-500/30 text-xs"
    >
      <ArrowLeft className="w-3 h-3 mr-1" />
      Output: {candidatesTokenCount}
    </Badge>
    <Badge
      variant="secondary"
      className="bg-purple-500/20 text-purple-200 border-purple-500/30 text-xs"
    >
      <Zap className="w-3 h-3 mr-1" />
      Total: {totalTokenCount}
    </Badge>
  </div>
);

export default TokenInfo;
