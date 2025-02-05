import { Priority, Status } from "./enums";

export type TaskDocument = {
    id? : string;
    title?: string;
    description?: string;
    priority?: Priority;
    dueDate?: Date;
    status?: Status;
}

export type documentStore = {
    document?: TaskDocument;
    setDocument: (document: TaskDocument) => void;
    updateDocument: (document: TaskDocument) => void;
}