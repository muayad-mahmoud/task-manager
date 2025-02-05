import { TaskDocument } from "../stores/document_store";

export interface TaskCardProps {
    task: TaskDocument;
    handleOpenModal: (task: TaskDocument) => void;
    triggerReload: () => void;
}