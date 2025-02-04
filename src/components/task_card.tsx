import React from "react";
import { TaskCardProps } from "../types/task_card";
import { Priority, useDocumentStore } from "../stores/document_store";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const TaskCard: React.FC<TaskCardProps> = ({
    task,
    handleOpenModal,
}) => {
    const navigate = useNavigate();
    const {setDocument} = useDocumentStore();
    return (
        <div className="relative border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center justify-center">
            <div>
                <div className="absolute top-2 right-2 flex flex-row gap-4">
                    <MdDelete  className="text-2xl cursor-pointer" onClick={() => {
                        handleOpenModal(task)
                    }}
                    />
                    <FaEdit className="text-2xl cursor-pointer" onClick={() => {
                        setDocument(task);
                        navigate(`/edit/${task.id}`)
                    }} />
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