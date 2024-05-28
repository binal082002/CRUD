import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth"
import {toast}  from "react-toastify"

const Login = () => {
    const [user, setUser] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify(user)
            });

            const res_data = await response.json(); //response will contain the data we passed in "res" through logic part of registration 
            // console.log("login-server data : ", res_data);
            if(response.ok){
                storeTokenInLS(res_data.token);
                // localStorage.setItem("Token" , res_data.token);

                toast.success("Login Successful!");
                setUser({email : "", password : ""});
                navigate("/"); //navigate to login page

            }else {
                toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
                // console.log("Invalid Credentials!");
            }

        }catch(err){
            console.log(err);
        }

    }


    return (
        <>
            <div className="section-registration mt-20">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                    <img src="/images/login.png" alt="Trying to login!"  className="ml-10 w-3/5 md:w-100 h-auto" />
                    </div>

                    <div className="registration-form">
                        <h1 className="text-5xl font-semibold mb-6">Login</h1>

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
                            Login Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;