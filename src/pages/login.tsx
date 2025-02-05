import { useEffect, useState } from "react";
import InputField from "../components/input_field";
import { auth } from "../firebase";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user_store";
import { toast } from "react-toastify";
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const user = useUserStore.getState().user;
        if(user) {
            toast.success("Already Logged In");
            navigate("/");
        }
    }, [navigate])

    const handleLogin = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredintials) => {
            if(userCredintials) {
                useUserStore.getState().setUser(userCredintials.user);
                toast.success("Successfully Logged In");
                navigate("/");
            }
        }).catch((error) => {
            if((error as AuthError).code === "auth/wrong-password") {
                toast.error("Wrong Email or Password");
            }
            else {
                toast.error("Something went wrong");
            }
        })
    }
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
            <button 
            className="bg-gray-200 p-4 rounded-xl border-gray-400"
            onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;