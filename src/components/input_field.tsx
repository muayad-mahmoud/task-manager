import React from "react";
import { InputFieldProps } from "../types/input_field";

const InputField: React.FC<InputFieldProps> = ({
    name,
    placeholder,
    obsecure = false,
    required = false,
    value,
    onChange,
    error
}) => {
    return (
        <div className="sm:w-1/3 w-full p-2">
            <input
                name={name}
                type={obsecure ? "password" : "text"}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-400 focus:outline-1 focus:outline-gray-400"
                value={value}
                onChange={onChange}
            />
            {required ?  error && <p className="text-red-500 text-sm">{error}</p> : <div></div>}
        </div>
    );
};

export default InputField;
