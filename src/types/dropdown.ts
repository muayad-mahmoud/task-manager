import { Priority, Status } from "../stores/types/enums";


export interface DropDownProps {
    name: string;
    value: Priority | Status;
    required: boolean;
    error: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}