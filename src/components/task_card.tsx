import React, { useEffect, useState } from "react";
import { TaskCardProps } from "../types/task_card";
import { Priority, Status, useDocumentStore } from "../stores/document_store";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusComponent from "./status-component";
import { FaCheckCircle } from "react-icons/fa";
import { UpdateTask as updateTask } from "../helpers/task_crud";
import { toast } from "react-toastify";
const TaskCard: React.FC<TaskCardProps> = ({
    task,
    handleOpenModal,
    triggerReload
}) => {
    const navigate = useNavigate();
    const [overDue, setOverDue] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false)
    const {setDocument} = useDocumentStore();

    useEffect(() => {
        const currentDate = new Date();
        if(task.dueDate! < currentDate) {
            setOverDue(true);
        }
        if (task.status === Status.Completed) {
            setTaskCompleted(true);
        }
    }, [task.dueDate, task.status])

    const handleCheckCompleted = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        setDocument({
            ...task,
            priority: Priority[task.priority!] as unknown as Priority,
            status: Status[Status.Completed] as unknown as Status
        });
        const checkedTask = useDocumentStore.getState().document;
        updateTask(checkedTask!).then(() => {
            toast.success("Task Updated successfully");
        }).catch(() => {
            toast.error("Something went wrong");
        });
        triggerReload();
    }
    return (
        <div className={`
        relative border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center justify-center
        ${overDue && !taskCompleted ? "bg-red-100" : ""}
        ${taskCompleted ? "bg-green-200" : ""}
        col-span-1
        `}>
            <div>
                <div className="absolute top-2 right-2 flex flex-row gap-4 items-center">
                    <MdDelete  className="text-2xl cursor-pointer" onClick={() => {
                        handleOpenModal(task)
                    }}
                    />
                    <FaEdit className="text-2xl cursor-pointer" onClick={() => {
                        setDocument(task);
                        navigate(`/edit/${task.id}`)
                    }} />
                    {
                        !taskCompleted && (
                            <FaCheckCircle  
                                className="text-xl cursor-pointer"
                                onClick={handleCheckCompleted}
                            />
                        )
                    }
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