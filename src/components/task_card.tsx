import React from "react";
import { TaskCardProps } from "../types/task_card";
import { Priority } from "../stores/document_store";
import { MdDelete } from "react-icons/md";
const TaskCard: React.FC<TaskCardProps> = ({
    task,
    handleOpenModal,
}) => {
    return (
        <div className="relative border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center justify-center">
            <div>
                <div className="absolute top-2 right-2">
                <MdDelete  className="text-2xl cursor-pointer" onClick={() => {
                    handleOpenModal(task)
                }}/>
            </div>
            <div className="p-2 text-center">
                <p>{task.title}</p>
                <p>{task.description}</p>
                <p>{task.dueDate!.toString()}</p>
                <p>{Priority[(task.priority as unknown) as keyof typeof Priority]}</p>
            </div>
            </div>
        </div>
    );
};


export default TaskCard;