import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

interface ContextSliderProps {
  numberOfPreviousMessagesAttached: number;
  setNumberOfPreviousMessagesAttached: (value: number) => void;
}

const ContextSlider = ({
  numberOfPreviousMessagesAttached,
  setNumberOfPreviousMessagesAttached,
}: ContextSliderProps) => {
  const [sliderValue, setSliderValue] = useState(
    numberOfPreviousMessagesAttached
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setNumberOfPreviousMessagesAttached(sliderValue);
    }, 300); // debounce 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [setNumberOfPreviousMessagesAttached, sliderValue]);

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-white/80 text-sm font-medium">
            Context:
          </span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-200 border-purple-500/30"
          >
            {sliderValue} messages
          </Badge>
        </div>
        <div className="w-full max-w-[200px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Slider
                  value={[sliderValue]}
                  onValueChange={(value) => setSliderValue(value[0])}
                  max={50}
                  min={0}
                  step={1}
                  className="w-8/10 sm:w-full"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust how many previous messages to include in context</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ContextSlider;
