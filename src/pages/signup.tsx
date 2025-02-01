import { useEffect, useState } from "react";
import InputField from "../components/input_field";
import { auth } from "../firebase";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const user = useUserStore.getState().user;
        if(user) {
            toast.success("Successfully signed up!");
            navigate("/home");
        }
    }, [navigate])
    

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            useUserStore.getState().setUser(userCredential.user);
            navigate("/home");
        } catch (error: unknown) {
            if((error as AuthError).code === "auth/email-already-in-use") {
                toast.error("Email already in use");
            }
            else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <InputField
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                placeholder="Password"
                obsecure
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>
                Signup
            </button>
        </div>
    );
};


export default Signup;