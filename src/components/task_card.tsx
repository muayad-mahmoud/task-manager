import React, { useEffect, useState } from "react";
import { TaskCardProps } from "../types/task_card";
import { Priority, Status, useDocumentStore } from "../stores/document_store";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusComponent from "./status-component";
const TaskCard: React.FC<TaskCardProps> = ({
    task,
    handleOpenModal,
}) => {
    const navigate = useNavigate();
    const [overDue, setOverDue] = useState(false);
    const {setDocument} = useDocumentStore();

    useEffect(() => {
        const currentDate = new Date();
        if(task.dueDate! < currentDate) {
            setOverDue(true);
        }
    }, [task.dueDate])
    return (
        <div className={`
        relative border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center justify-center
        ${overDue ? "bg-red-100" : "bg-white"}
        `}>
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
                <div className="absolute top-2 left-2 flex flex-row gap-4">
                    {
                        (overDue && task.status !== Status.Completed) ? 
                        <StatusComponent status={Status.Overdue} />
                        :
                        <StatusComponent status={task.status!}  />
                        
                    }
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