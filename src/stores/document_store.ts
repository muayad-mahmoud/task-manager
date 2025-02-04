import { create } from "zustand"

export enum Priority {
    Low = 0,
    Medium = 1,
    High = 2
}
export type TaskDocument = {
    id? : string;
    title?: string;
    description?: string;
    priority?: Priority;
    dueDate?: Date;
    status?: string;
}

type documentStore = {
    document: TaskDocument;
    setDocument: (document: TaskDocument) => void;
    updateDocument: (document: TaskDocument) => void;
}

export const useDocumentStore = create<documentStore>((set) => ({
    document: { title: '', description: undefined, priority: Priority.Low, dueDate: undefined  },
    setDocument: (document: TaskDocument) => set({ document }),
    updateDocument: (document: TaskDocument) => set({ document }),
  }));