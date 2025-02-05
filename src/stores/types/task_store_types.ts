import { TaskDocument } from "./document_store_types";

export type TasksDocuments = {
    tasks: TaskDocument[]
}
export type taskStore = {
    tasks: TasksDocuments;
    setTasks: (tasks: TaskDocument[]) => void;
}