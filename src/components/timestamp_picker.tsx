import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { TimeStampProps } from '../types/timestamp';
const TimeStampPicker: React.FC<TimeStampProps> = ({
    handleChangeDate,
    value: TaskDate,
    error
}) => {
    type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className='flex flex-col items-center justify-center'>
            <DateTimePicker
            onChange={(value) => {
            onChange(value);
            handleChangeDate(value!);
            }} 
            value={TaskDate ?? value} className={"w-full flex flex-col items-center"} 
            />
            {error !== "" ? <p className="text-red-500 text-sm">{error}</p> : <div></div>}
        </div>
    )
}
   


export default TimeStampPicker;