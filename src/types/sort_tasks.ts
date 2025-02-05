export interface SortTasksProps {
    orderByDate: boolean;
    orderByPriority: boolean;
    setOrderBy: React.Dispatch<React.SetStateAction<{
        [key: string]: "" | "asc" | "desc";
    }>>
    setOrderByDate: (orderByDate: boolean) => void;
    setOrderByPriority: (orderByPriority: boolean) => void;
    reloadTasks: () => void;
}