import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RotateCcw, Zap, ChevronDown } from "lucide-react";
import ContextSlider from "../ContextSlider/ContextSlider";

interface HeaderBarProps {
  numberOfPreviousMessagesAttached: number;
  setNumberOfPreviousMessagesAttached: (value: number) => void;
  totalTokenSum: number;
  resetTokenCount: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const models = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Fast and efficient AI model",
  },
  {
    id: "mistral-3.2-small",
    name: "Mistral 3.2 Small",
    description: "Compact and powerful model",
  },
];

const HeaderBar = ({
  numberOfPreviousMessagesAttached,
  setNumberOfPreviousMessagesAttached,
  totalTokenSum,
  resetTokenCount,
  selectedModel,
  setSelectedModel,
}: HeaderBarProps) => {
  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-center text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-2 hover:from-purple-300 hover:to-pink-300 transition-all duration-200">
                <Zap className="w-6 h-6 text-purple-400" />
                {currentModel.name}
                <ChevronDown className="w-5 h-5 text-purple-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64">
              {models.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className="flex flex-col items-start p-3 cursor-pointer"
                >
                  <div className="font-medium">{model.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {model.description}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-row justify-between items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
          <ContextSlider
            numberOfPreviousMessagesAttached={numberOfPreviousMessagesAttached}
            setNumberOfPreviousMessagesAttached={
              setNumberOfPreviousMessagesAttached
            }
          />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="hidden sm:inline text-white/80 text-sm">
                Tokens Used{" "}
              </p>
              <Badge
                variant="outline"
                className="bg-green-500/20 text-green-200 border-green-500/30"
              >
                {totalTokenSum.toLocaleString()}
              </Badge>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={resetTokenCount}
                  size="sm"
                  variant="destructive"
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset token counter</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HeaderBar;
