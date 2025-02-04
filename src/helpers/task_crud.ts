import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase";
import { Priority, TaskDocument } from "../stores/document_store";

export const createTask = async (task: TaskDocument): Promise<void> => {
  const priorityValue = Priority[(task.priority as unknown) as keyof typeof Priority];

  try {
    await addDoc(collection(db, "tasks"), {
      Description: task.description,
      DueDate: task.dueDate,
      Priority: priorityValue,
      Title: task.title,
    })
  } catch (error) {
    throw new Error(`Error creating task: ${error}`);
  }
};
