export interface InputFieldProps {
    name?: string;
    error?: string;
    value?: string;
    placeholder: string;
    obsecure?: boolean
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}