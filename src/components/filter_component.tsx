import InputField from "./input_field";

interface FilterInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    onReset: () => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  value,
  onChange,
  onSearch,
  onReset,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <InputField placeholder="Filter by title" value={value} onChange={onChange} />
      <button
        className="bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer"
        onClick={onSearch}
      >
        Search
      </button>
      <button
        className="bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterInput;