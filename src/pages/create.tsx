import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user_store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/input_field";
import { Timestamp } from "@firebase/firestore";
import DropDown from "../components/dropdown";
import TimeStampPicker from "../components/timestamp_picker";
import { validate } from "../helpers/validate";
import { createTask } from "../helpers/task_crud";
import { useDocumentStore } from "../stores/document_store";
import { Priority } from "../stores/types/enums";

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { document, setDocument } = useDocumentStore();

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
    });

    const requiredFields: { [key: string]: boolean } = {
        title: true,
        description: false,
        priority: true,
        dueDate: true,
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDocument({
            ...document,
            [name]: value,
        });

        setFormErrors((prev) => ({
            ...prev,
            [name]: requiredFields[name] && value.trim() === "" ? "This field is required" : "",
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        setDocument({
            ...document,
            dueDate: date!,
        });

        setFormErrors((prev) => ({
            ...prev,
            dueDate: requiredFields.dueDate && Timestamp.fromDate(date!).toString().trim() === "" ? "This field is required" : "",
        }));
    };

    useEffect(() => {
        const user = useUserStore.getState().user;
        if (!user) {
            toast.error("You are not logged in");
            navigate("/login");
        }
    }, [navigate]);

    const handleCreateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const task = useDocumentStore.getState().document;
        const validateObject = await validate(task!, requiredFields, setFormErrors);

        if (!validateObject) {
            createTask(task!).then(() => {
                toast.success("Task created successfully");
            }).catch(() => {
                toast.error("Something went wrong");
            });
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
            <InputField
                placeholder="Title"
                name="title"
                value={document !== undefined ? document.title : ""}
                error={formErrors.title}
                onChange={handleInputChange}
                required={requiredFields.title}
            />
            <InputField
                placeholder="Description"
                name="description"
                value={document !== undefined ? document.description : ""}
                error={formErrors.description}
                onChange={handleInputChange}
                required={requiredFields.description}
            />
            <DropDown
                name="priority"
                value={document?.priority ?? Priority.Low}
                options={["Low", "Medium", "High"]}
                required={requiredFields.priority}
                error={formErrors.priority}
                onChange={(value) => handleInputChange(value)}
            />
            <TimeStampPicker
                handleChangeDate={handleDateChange}
                error={formErrors.dueDate}
            />
            <button
                onClick={handleCreateTask}
                className="bg-gray-200 p-4 rounded-xl border-gray-400"
            >
                Add Task
            </button>
        </div>
    );
};

export default CreatePage;
