import { addDoc, collection, deleteDoc, doc, documentId, getDocs, query, Timestamp, updateDoc, where } from "@firebase/firestore";
import { db } from "../firebase";
import { Priority, Status, TaskDocument } from "../stores/document_store";

export const createTask = async (task: TaskDocument): Promise<void> => {
  const priorityValue = Priority[(task.priority as unknown) as keyof typeof Priority];
  let StatusValue = Status.Pending;
  //Compare dueDate to DateTime now
  const currentDate = new Date();
  if(task.dueDate! > currentDate) {
    StatusValue = Status.Overdue;
  }

  try {
    await addDoc(collection(db, "tasks"), {
      description: task.description,
      dueDate: task.dueDate,
      priority: priorityValue,
      title: task.title,
      status: StatusValue
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
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: new Date((data.dueDate as unknown as Timestamp).seconds * 1000),
      status: data.status
    }
    return newTask;
  });
};

export const getTask = async (id: string): Promise<TaskDocument> => {
  const taskQuery = query(collection(db, "tasks"), where(documentId(), "==", id));
  const task = await getDocs(taskQuery);
  return task.docs.map(doc => {
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
  })[0];
};

export const UpdateTask = async (task: TaskDocument): Promise<void> => {
  const priorityValue = Priority[(task.priority as unknown) as keyof typeof Priority];
  const StatusValue = Status[(task.status as unknown) as keyof typeof Status];
  try{
    const taskRef = doc(db , "tasks", task.id!);
    await updateDoc(taskRef, {
      title: task.title,
      description: task.description,
      priority: priorityValue,
      dueDate: task.dueDate,
      status: StatusValue
    })
  }catch(err){
    console.error(err);
  }
}
export const deleteTask = async (task:TaskDocument): Promise<void> => {
  try {
    await deleteDoc(doc(db, "tasks", task.id!));
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}

