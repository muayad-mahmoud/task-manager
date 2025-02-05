import React, { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../helpers/task_crud";
import { useTasksStore } from "../stores/tasks_store";
import TaskCard from "../components/task_card";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TaskDocument } from "../stores/document_store";
import ConfirmationDialog from "../components/confirmation_dialog";
import { FaAngleDown, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import InputField from "../components/input_field";
import { QueryDocumentSnapshot } from "firebase/firestore";

const HomePage: React.FC = () => {
  const { tasks, setTasks } = useTasksStore();
  const [isOpen, setIsOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskDocument | null>(null);
  const [orderByDate, setOrderByDate] = useState(false);
  const [orderByPriority, setOrderByPriority] = useState(false);
  const [orderBy, setOrderBy] = useState<{ [key: string]: "asc" | "desc" | "" }>({
    dueDate: "",
    priority: "",
  });
  const [filter, setFilter] = useState("");
  const [isReloading, setIsReloading] = useState(true);

  // Pagination state
  const [limit, setLimit] = useState(10); // Default page size is 10.
  const [currentPage, setCurrentPage] = useState(0);
  // Holds the last document of each fetched page.
  const [paginationDocs, setPaginationDocs] = useState<(QueryDocumentSnapshot | null)[]>([]);

  const navigate = useNavigate();

  // Resets the pagination and triggers a reload.
  const reloadTasks = () => {
    setCurrentPage(0);
    setPaginationDocs([]);
    setIsReloading(true);
  };

  const handleOpenModal = (task: TaskDocument | null) => {
    setTaskToDelete(task);
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

  const handleDeleteClick = async (task: TaskDocument) => {
    await deleteTask(task)
      .then(() => {
        toast.success("Task deleted successfully");
        reloadTasks();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const fetchTasks = async (page: number) => {
    let lastVisible: QueryDocumentSnapshot | undefined = undefined;
    if (page > 0 && paginationDocs[page - 1]) {
      lastVisible = paginationDocs[page - 1] as QueryDocumentSnapshot;
    }
    const acquiredTasks = await getTasks(orderBy, filter, limit, lastVisible);

    setTasks(acquiredTasks.tasks);

    setPaginationDocs((prevDocs) => {
      const newDocs = [...prevDocs];
      if (page >= newDocs.length) {
        newDocs.push(acquiredTasks.lastDoc);
      } else {
        newDocs[page] = acquiredTasks.lastDoc;
      }
      return newDocs;
    });
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isReloading) {
      setCurrentPage(0);
      setPaginationDocs([]);
      fetchTasks(0).then(() => setIsReloading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReloading, orderBy, filter, limit]);

  useEffect(() => {
    const user = useUserStore.getState().user;
    if (!user) {
      toast.error("You are not logged in");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Handler to change the page size limit and reload the tasks.
  const handleLimitChange = (newLimit: number) => {
    if (newLimit !== limit) {
      setLimit(newLimit);
      reloadTasks();
    }
  };

  return (
    <div className="h-screen flex flex-col gap-5 p-3">
      {/* Sorting Buttons */}
      <div className="flex flex-row gap-2">
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy((prev) => ({
              ...prev,
              dueDate: prev.dueDate === "asc" ? "desc" : "asc",
            }));
            setOrderByDate(!orderByDate);
            reloadTasks();
          }}
        >
          <p>Order By Due</p>
          <FaAngleDown className={`${orderByDate ? "rotate-180" : ""} transition-all duration-500`} />
        </button>
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy((prev) => ({
              ...prev,
              priority: prev.priority === "asc" ? "desc" : "asc",
            }));
            setOrderByPriority(!orderByPriority);
            reloadTasks();
          }}
        >
          <p>Order By Priority</p>
          <FaAngleDown className={`${orderByPriority ? "rotate-180" : ""} transition-all duration-500`} />
        </button>
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
          onClick={() => {
            setOrderBy({ dueDate: "", priority: "" });
            setOrderByDate(false);
            setOrderByPriority(false);
            reloadTasks();
          }}
        >
          <p>Clear</p>
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-row gap-2 items-center">
        <InputField placeholder="Filter by title" value={filter} onChange={handleInputChange} />
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer"
          onClick={() => setIsReloading(true)}
        >
          Search
        </button>
        <button
          className="bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer"
          onClick={() => {
            setFilter("");
            setIsReloading(true);
          }}
        >
          Reset
        </button>
      </div>

      {/* Page Size Limit Buttons */}
      <div className="flex flex-row gap-2 items-center">
        <p className="font-medium">Items per page:</p>
        <button
          className={`bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer ${
            limit === 10 ? "bg-blue-100" : ""
          }`}
          onClick={() => handleLimitChange(10)}
        >
          10
        </button>
        <button
          className={`bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer ${
            limit === 50 ? "bg-blue-100" : ""
          }`}
          onClick={() => handleLimitChange(50)}
        >
          50
        </button>
        <button
          className={`bg-gray-100 border border-gray-200 p-2 rounded cursor-pointer ${
            limit === 100 ? "bg-blue-100" : ""
          }`}
          onClick={() => handleLimitChange(100)}
        >
          100
        </button>
      </div>

      {/* Pagination Controls and Task List */}
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex justify-between items-center">
          <button
            className={`p-2 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={currentPage === 0}
            onClick={() => {
              if (currentPage > 0) {
                fetchTasks(currentPage - 1);
              }
            }}
          >
            <FaAngleLeft className="text-2xl" />
          </button>

          <p>Page {currentPage + 1}</p>

          <button
            className={`p-2 ${
              tasks.tasks.length < limit || paginationDocs[currentPage] === null
                ? "opacity-50 cursor-not-allowed"
                : " cursor-pointer"
            }`}
            disabled={tasks.tasks.length < limit || paginationDocs[currentPage] === null}
            onClick={() => {
              if (tasks.tasks.length === limit && paginationDocs[currentPage] !== null) {
                fetchTasks(currentPage + 1);
              }
            }}
          >
            <FaAngleRight className="text-2xl" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center justify-center">
          {tasks.tasks.map((task: TaskDocument) => (
            <TaskCard
              task={task}
              key={task.id}
              handleOpenModal={handleOpenModal}
              triggerReload={reloadTasks}
            />
          ))}
        </div>
      </div>

      <ConfirmationDialog isOpen={isOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default HomePage;
