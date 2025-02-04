import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp } from "@firebase/firestore";
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


export const getTasks = async (): Promise<TaskDocument[]> => {
  const tasks = await getDocs(collection(db, "tasks"));
  return tasks.docs.map(doc => {
    const data = doc.data();
    const newTask: TaskDocument = {
      id: doc.id,
      title: data.Title,
      description: data.Description,
      priority: data.Priority,
      dueDate: new Date((data.DueDate as unknown as Timestamp).seconds * 1000),
      status: data.Status
    }
    return newTask;
  });
};


export const deleteTask = async (task:TaskDocument): Promise<void> => {
  try {
    await deleteDoc(doc(db, "tasks", task.id!));
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}