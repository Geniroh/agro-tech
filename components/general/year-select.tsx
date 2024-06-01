import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const YearSelect = () => {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1970 + 1 }, (_, index) => 1970 + index);
    setYears(yearsArray);
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full bg-[#fafafa]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent position='popper'>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
