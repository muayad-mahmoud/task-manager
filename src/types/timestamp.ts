export interface TimeStampProps {
    handleChangeDate: (date: Date | undefined) => void;
    value?: Date;
    error: string;
}