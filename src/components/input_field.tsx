import React from "react";
import { InputFieldProps } from "../types/input_field";

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    obsecure = false,
    onChange
}) => {
    return (
        <div className="sm:w-1/3 w-full p-2">
            <input
                type={obsecure ? "password" : "text"}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-400 focus:outline-1 focus:outline-gray-400"
                onChange={onChange}
            />
        </div>
    )
};

export default InputField;