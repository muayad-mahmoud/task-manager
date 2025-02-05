import React, { useEffect, useState } from "react";

import InputField from "../components/input_field";
import Dropdown from "../components/dropdown";
import { getTask, UpdateTask as updateTask } from "../helpers/task_crud";
import TimeStampPicker from "../components/timestamp_picker";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { validate } from "../helpers/validate";
import { useDocumentStore } from "../stores/document_store";
import { Priority, Status } from "../stores/types/enums";


const EditPage:React.FC = () => {
    const {document, setDocument} = useDocumentStore();
    const navigate = useNavigate();
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
        status: false
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getEnumValue = (enumValue: number, enumObject: any) => {
        if(isNaN(Number(enumValue))) return enumValue;
        return Object.keys(enumObject).find(key => enumObject[key] === enumValue);
      }
    useEffect(() => {
        if (document === undefined) {
            //handling refresh
            const fetchData = async () => {
                const documentId = window.location.href.split("/")[4];
                const task = await getTask(documentId!);
                setDocument(task);
            }
            fetchData();
        }
    });

    useEffect(() => {
            const user = useUserStore.getState().user;
            if (!user) {
                toast.error("You are not logged in");
                navigate("/login");
            }
        }, [navigate])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            console.log("helpers", typeof name, typeof value);
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

    const handleUpdateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const task = useDocumentStore.getState().document;
        const validateObject = await validate(task!, requiredFields, setFormErrors);

        if (!validateObject) {
            updateTask(task!).then(() => {
                toast.success("Task Updated successfully");
            }).catch(() => {
                toast.error("Something went wrong");
            });
        }
    };
    return (
        document && <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
            {
                Object.entries(document!).map(([key, value]) => {
                    switch(key) {
                        case "status":
                        case "priority":{
                            let options: string[] = []
                            if(key === "priority") {
                                options = Object.values(Priority).filter(value => typeof value === "string");
                                
                            }
                            else {
                                options = Object.values(Status).filter(value => typeof value === "string");
                            }
                            return(
                                <Dropdown  
                                    key={key}
                                    name={key}
                                    value={key === "priority" ? getEnumValue(document.priority!, Priority) as unknown as Priority : getEnumValue(document.status!, Status) as unknown as Status}
                                    options={options}
                                    required={requiredFields[key as keyof typeof requiredFields]}
                                    error={formErrors[key as keyof typeof formErrors]}
                                    onChange={(value) => handleInputChange(value)}
                            />
                            )
                        }
                        case "dueDate":
                            return(
                                <TimeStampPicker
                                    value={value as Date}
                                    key={key}
                                    handleChangeDate={handleDateChange }
                                    error={formErrors.dueDate}                         />
                            )
                        case "id":
                            break;
                        default:
                            return(
                                <InputField  
                                    placeholder={key}
                                    key={key}
                                    name={key}
                                    value={typeof value === 'object' && value instanceof Date ? value.toLocaleString() : value as string}
                                    onChange={handleInputChange}
                                    required={requiredFields.description}
                                />
                            )
                    }
                    
            })
            }
            <button
            onClick={handleUpdateTask}
            >
                Click me
            </button>
        </div>
    );
};
export default EditPage;