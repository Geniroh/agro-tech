import { Select } from "antd";
import * as React from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { IoCloseCircleSharp } from "react-icons/io5";

export function TagSelect({
  name,
  options,
  optionsName,
  onValueChange,
  value,
  loading,
}: {
  name: string;
  optionsName?: string;
  options: (string | number)[];
  onValueChange?: ((value: string) => void) | undefined;
  value?: string;
  loading?: boolean;
}) {
  const handleClear = () => {
    if (onValueChange) {
      onValueChange("");
    }
  };
  return (
    <div className="bg-[#fafafa] rounded-xl flex gap-x-1 items-center px-2 w-fit overflow-hidden">
      <span className="text-[12px] lowercase text-muted-foreground text-nowrap">
        {name} :
      </span>
      <Select
        onChange={onValueChange}
        variant="borderless"
        showSearch
        className=""
        allowClear
        onClear={handleClear}
        defaultValue={value}
        placeholder={optionsName}
        loading={loading}
        dropdownStyle={{ minWidth: "150px" }}
      >
        {options.map((option, i) => (
          <Select.Option value={option} key={i}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export function TagSelect2({
  name,
  options,
  optionsName,
  onValueChange,
  value,
  loading,
}: {
  name: string;
  optionsName?: string;
  options: (string | number)[];
  onValueChange?: ((value: string) => void) | undefined;
  value?: string;
  loading?: boolean;
}) {
  const handleClear = () => {
    if (onValueChange) {
      onValueChange(""); // Set the value to an empty string
    }
  };
  return (
    <div className="bg-[#fafafa] rounded-xl flex flex-col justify-between items-center px-4 w-fit overflow-hidden py-2 relative">
      <span className="text-[14px] text-muted-foreground text-nowrap">
        {name} :
      </span>
      <button className="absolute top-[3px] right-[3px]" onClick={handleClear}>
        {/* USE THIS TO CLEAR */}
        <IoCloseCircleSharp />
      </button>
      <Select
        onChange={onValueChange}
        variant="borderless"
        showSearch
        className=""
        allowClear
        onClear={handleClear}
        defaultValue={value}
        placeholder={optionsName}
        loading={loading}
      >
        {options.map((option, i) => (
          <Select.Option value={option} key={i}>
            {option}
          </Select.Option>
        ))}
      </Select>

      {/* <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="w-fit shadow-none focus-visible:ring-0 border-none">
          <SelectValue placeholder={optionsName} className="mr-2 text-[12px]" />
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
      </Select> */}
    </div>
  );
}
