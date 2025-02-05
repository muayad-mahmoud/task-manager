import { TaskDocument } from "../stores/types/document_store_types";


export interface TaskCardProps {
    task: TaskDocument;
    handleOpenModal: (task: TaskDocument) => void;
    triggerReload: () => void;
}