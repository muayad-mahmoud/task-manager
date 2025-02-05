import React, { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../helpers/task_crud";
import { useTasksStore } from "../stores/tasks_store";
import TaskCard from "../components/task_card";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TaskDocument } from "../stores/document_store";
import ConfirmationDialog from "../components/confirmation_dialog";
import { FaAngleDown } from "react-icons/fa";
import InputField from "../components/input_field";

const HomePage: React.FC = () => {
  const { tasks, setTasks } = useTasksStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState<TaskDocument | null>(null);
  const [orderByDate, setOrderByDate] = useState(false);
  const [orderByPriority, setOrderByPriority] = useState(false);
  const [orderBy, setOrderBy] = useState<{ [key: string]: "asc" | "desc" | "" }>({
    dueDate: "",
    priority: "",
  });
  const [filter, setFilter] = useState("")
  const navigate = useNavigate();
  const reloadTasks = () => {
    setIsReloading(true);
  }
  const handleOpenModal = (taskToDelete: TaskDocument | null) => {
    setTaskToDelete(taskToDelete);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await handleDeleteClick(taskToDelete).then(() => {
        setTaskToDelete(null);
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isReloading) {
      const fetchData = async () => {
        if(filter !== ""){
            const acquiredTasks = await getTasks(orderBy, filter);
            setTasks(acquiredTasks);
        }
        else {
            const acquiredTasks = await getTasks(orderBy);
            setTasks(acquiredTasks);
        }
      };
      fetchData();
      setIsReloading(false);
    }
  }, [isReloading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
  }
  const handleDeleteClick = async (task: TaskDocument) => {
    await deleteTask(task).then(() => {
      setIsReloading(true);
      toast.success("Task deleted successfully");
    }).catch((error) => {
      toast.error(error);
    });
  };

  useEffect(() => {
    const user = useUserStore.getState().user;
    if (!user) {
      toast.error("You are not logged in");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col gap-5 p-3">
      <div className="flex flex-row gap-2">
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy((prev) => ({
              ...prev,
              dueDate: prev.dueDate === "asc" ? "desc" : "asc",
            }));
            setIsReloading(true);
            setOrderByDate(!orderByDate);
          }}
        >
          <p>Order By Due</p>
          <FaAngleDown
            className={`${orderByDate ? "rotate-180" : ""} transition-all duration-500`}
          />
        </button>
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy((prev) => ({
              ...prev,
              priority: prev.priority === "asc" ? "desc" : "asc",
            }));
            setIsReloading(true);
            setOrderByPriority(!orderByPriority);
          }}
        >
          <p>Order By Priority</p>
          <FaAngleDown
            className={`${orderByPriority ? "rotate-180" : ""} transition-all duration-500`}
          />
        </button>
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy({
              dueDate: "",
              priority: "",
            });
            setIsReloading(true);
            setOrderByDate(false);
            setOrderByPriority(false);
          }}
        >
          <p>Clear</p>
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <InputField 
          placeholder="Filter by title"
          value={filter}
          onChange={handleInputChange}
        />
        <button
        className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2 cursor-pointer"
        onClick={()=> setIsReloading(true)}
        >
            Search
        </button>
        <button
        className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2 cursor-pointer"
        onClick={()=> {
            setFilter("");
            setIsReloading(true);
        }}
        >
            Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        {tasks.tasks.map((task) => {
          return (
            <TaskCard
              task={task}
              key={task.id}
              handleOpenModal={handleOpenModal}
              triggerReload={reloadTasks}
            />
          );
        })}
      </div>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default HomePage;
