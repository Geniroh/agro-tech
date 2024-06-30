import * as React from "react";
import { Select } from "antd";
import { IoCloseCircleSharp } from "react-icons/io5";

export function TagSelect3({
  name,
  options,
  optionsName,
  onValueChange,
  value,
  loading = false,
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
    <div className="bg-[#fafafa] rounded-xl flex flex-col justify-between items-center px-1 md:px-4 w-fit overflow-hidden py-2 relative">
      <span className="text-[12px] md:text-[14px] text-muted-foreground">
        {name} :
      </span>
      <Select
        onChange={onValueChange}
        variant="borderless"
        showSearch
        className="w-full"
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
    </div>
  );
}
