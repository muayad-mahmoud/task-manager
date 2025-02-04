import { Priority, Status } from "../stores/document_store";

export interface DropDownProps {
    name: string;
    value: Priority | Status;
    required: boolean;
    error: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}