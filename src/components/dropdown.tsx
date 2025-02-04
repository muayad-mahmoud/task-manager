import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { DropDownProps } from "../types/dropdown";

const Dropdown: React.FC<DropDownProps> = ({
    name,
    value,
    options,
    required,
    error,
    onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedOption: string) => {
    
    const event = {
      target: {
        name,
        value: selectedOption
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
    setIsOpen(false);
  };
  return (
    <div className="relative z-20 flex flex-col items-center gap-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-black bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {value || "Select an option"}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
          <ul className="py-2 text-gray-700">
            {
              options.map((option, index) => (
                <li
                
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer z-50"
                  onClick={() => {
                    handleSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            }
          </ul>
          
        </div>
        
      )}
    {required ?  error && <p className="text-red-500 text-sm">{error}</p> : <div></div>}
    </div>
  );
}

export default Dropdown;