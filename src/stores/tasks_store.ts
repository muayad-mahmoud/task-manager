import { create } from "zustand"
import { TaskDocument } from "./document_store";

type TasksDocuments = {
    tasks: TaskDocument[]
}
type taskStore = {
    tasks: TasksDocuments;
    setTasks: (tasks: TaskDocument[]) => void;
}

export const useTasksStore = create<taskStore>((set) => ({
    tasks: { tasks: [] },
    setTasks: (tasks: TaskDocument[]) => set({tasks: {tasks}}),
  }));