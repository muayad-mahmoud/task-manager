import { create } from "zustand"
import { documentStore, TaskDocument } from "./types/document_store_types";

export const useDocumentStore = create<documentStore>((set) => ({
    document: undefined,
    setDocument: (document: TaskDocument) => set({ document }),
    updateDocument: (document: TaskDocument) => set({ document }),
  }));