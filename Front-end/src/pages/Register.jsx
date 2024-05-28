import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const res_data = await response.json();
            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("Registration Successful!");
                setUser({ username : "", email: "", password: "" });
                navigate("/login");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="section-registration mt-20">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <img src="/images/register.png" alt="Trying to register!" className="ml-10 w-3/5 md:w-100 h-auto" />
                    </div>

                    <div className="registration-form">
                        <h1 className="text-5xl font-semibold mb-6">Registration Form</h1>

                        <div className="mb-6">
                            <label htmlFor="name" className="text-xl block mb-1">Name</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your name"
                                value={user.username}
                                onChange={handleInput}
                                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="text-xl block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={handleInput}
                                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="text-xl block mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleInput}
                                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button onClick={handleSubmit} className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
