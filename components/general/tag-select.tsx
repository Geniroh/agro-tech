import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TagSelect({
  name,
  options,
  optionsName,
  onValueChange,
  value,
}: {
  name: string;
  optionsName?: string;
  options: (string | number)[];
  onValueChange?: ((value: string) => void) | undefined;
  value?: string;
}) {
  return (
    <div className="bg-[#fafafa] rounded-xl flex gap-x-1 items-center px-2 w-fit overflow-hidde">
      <span className="text-[12px] lowercase text-muted-foreground">
        {name} :
      </span>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="w-fit shadow-none focus-visible:ring-0 border-none">
          <SelectValue placeholder="All" className="mr-2" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-muted-foreground text-sm">
              {optionsName || name}
            </SelectLabel>
            {options.map((option, i) => (
              <SelectItem
                value={option.toString()}
                key={i}
                className="capitalize"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
