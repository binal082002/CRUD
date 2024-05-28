import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";


const Home = () => {

    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const displayList = () =>{
        if(!isLoggedIn){
            toast.error("Access denied! Login first!!");
            return navigate("/login");
        }

        return  navigate("/userList");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-5xl font-bold text-[#913a99] mt-3 mb-8">Welcome to CRUD Operations</h1>
            <p className="text-2xl text-gray-700 max-w-2xl text-center mb-8">
                This application demonstrates basic CRUD (Create, Read, Update, Delete) operations. CRUD operations are essential in most web applications as they provide the fundamental ways to interact with data. Use this app to add, view, edit, and delete user data.
            </p>
                
            <button onClick = {()=>displayList()} className="w-32 h-12 border border-[#913a99] rounded-full text-[#4c58de] text-lg font-medium bg-white hover:bg-gray-100 focus:outline-none">
                User List
            </button>
        </div>
    );
};

export default Home;
