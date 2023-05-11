import { useSearchBar } from "./hook";

type Props = {
  onSearch: (keyword: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const { inputValue, handleKeyDown, handleInputChange } = useSearchBar({
    onSearch,
  });

  return (
    <>
      <input
        style={{
          width: "500px",
          marginBottom: "30px",
          padding: "10px",
        }}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
    </>
  );
};
export default SearchBar;
