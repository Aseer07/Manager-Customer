import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
};

export function useSearchBar({ onSearch }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return { inputValue, handleKeyDown, handleInputChange };
}
