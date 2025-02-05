import { FaAngleDown } from "react-icons/fa";
import { SortTasksProps } from "../types/sort_tasks";


  
const SortTasks: React.FC<SortTasksProps> = ({
  orderByDate,
  orderByPriority,
  setOrderBy,
  setOrderByDate,
  setOrderByPriority,
  reloadTasks,
}) => {
  
  const handleOrderByDueDate = () => {
    setOrderBy((prev) => ({
      ...prev,
      dueDate: prev.dueDate === "asc" ? "desc" : "asc",
    }));
    setOrderByDate(!orderByDate);
    reloadTasks();
  };

  const handleOrderByPriority = () => {
    setOrderBy((prev) => ({
      ...prev,
      priority: prev.priority === "asc" ? "desc" : "asc",
    }));
    setOrderByPriority(!orderByPriority);
    reloadTasks();
  };

  const handleClearSorting = () => {
    setOrderBy({ dueDate: "", priority: "" });
    setOrderByDate(false);
    setOrderByPriority(false);
    reloadTasks();
  };

  return (
    <div className="flex flex-row gap-2">
      <button
        className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
        onClick={handleOrderByDueDate}
      >
        <p>Order By Due</p>
        <FaAngleDown className={`${orderByDate ? "rotate-180" : ""} transition-all duration-500`} />
      </button>
      <button
        className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
        onClick={handleOrderByPriority}
      >
        <p>Order By Priority</p>
        <FaAngleDown className={`${orderByPriority ? "rotate-180" : ""} transition-all duration-500`} />
      </button>
      <button
        className="bg-gray-100 border border-gray-200 p-2 rounded flex flex-row items-center gap-2"
        onClick={handleClearSorting}
      >
        <p>Clear</p>
      </button>
    </div>
  );
};

export default SortTasks;