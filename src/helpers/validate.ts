import { TaskDocument } from "../stores/document_store";

export const validate = async (task: TaskDocument, required: {[key: string]: boolean}, setFormErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>): Promise<boolean> => {
    let hasErrors = false;
    for(const key in task) {
        const value = task[key as keyof TaskDocument];
        if(required[key] && (!value || (typeof value === 'string' && value.trim() === ""))) {
            setFormErrors(prev => ({
            ...prev,
            [key]: "This field is required",
            }))
            hasErrors = true;
        } else {
            setFormErrors(prev => ({
                ...prev,
                [key]: "",
            }))
        }
    }
    return hasErrors;
}
