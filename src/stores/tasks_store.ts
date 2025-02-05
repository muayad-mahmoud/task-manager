import { create } from "zustand"
import { taskStore } from "./types/task_store_types";
import { TaskDocument } from "./types/document_store_types";



export const useTasksStore = create<taskStore>((set) => ({
    tasks: { tasks: [] },
    setTasks: (tasks: TaskDocument[]) => set({tasks: {tasks}}),
  }));