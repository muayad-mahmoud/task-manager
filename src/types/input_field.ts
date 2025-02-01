export interface InputFieldProps {
    placeholder: string;
    obsecure?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}