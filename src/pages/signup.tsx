import { useEffect, useState } from "react";
import InputField from "../components/input_field";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user_store";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const user = useUserStore.getState().user;
        console.log("", user);
        if(user) {
            navigate("/home");
        }
    }, [navigate])
    

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            useUserStore.getState().setUser(userCredential.user);
            navigate("/home");
        } catch (error) {
            console.error(error);
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