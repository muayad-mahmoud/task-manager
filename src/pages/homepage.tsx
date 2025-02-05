import React, { useEffect, useState } from "react"
import { deleteTask, getTasks } from "../helpers/task_crud";
import { useTasksStore } from "../stores/tasks_store";
import TaskCard from "../components/task_card";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TaskDocument } from "../stores/document_store";
import ConfirmationDialog from "../components/confirmation_dialog";
const HomePage: React.FC = () => {
    const { tasks, setTasks } = useTasksStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isReloading, setIsReloading] = useState(true);
    const [taskToDelete, setTaskToDelete] = useState<TaskDocument | null>(null);
    const navigate = useNavigate();
    
    const handleOpenModal = (taskToDelete: TaskDocument | null) => {
        setTaskToDelete(taskToDelete)
        setIsOpen(true);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleConfirmDelete =  async () => {
        if(taskToDelete) {
            await handleDeleteClick(taskToDelete).then(() => {
                setTaskToDelete(null);
            })
        }
        setIsOpen(false);
    }
    useEffect(() => {
        if(isReloading) {
            const fetchData = async () => {
                const acquiredTasks = await getTasks();
                setTasks(acquiredTasks);
            }
            fetchData();
            setIsReloading(false);
        }
    },[isReloading])

    const handleDeleteClick = async (task: TaskDocument) => {
        await deleteTask(task).then(() => {
            setIsReloading(true);
            toast.success("Task deleted successfully");
        }).catch((error) => {
            toast.error(error);
        })
    }
    useEffect(() => {
        const user = useUserStore.getState().user;
        if (!user) {
            toast.error("You are not logged in");
            navigate("/login");
        }
    }, [navigate])
    return (
        <div className="h-screen w-screen">
            <div className="grid grid-cols-4 gap-2 items-center justify-center border h-1/2">
                {tasks.tasks.map((task) => {
                    return <TaskCard
                    task={task}
                    key={task.id}
                    handleOpenModal={handleOpenModal}
                    />;
                })}
            </div>
            <ConfirmationDialog
            isOpen={isOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default HomePage