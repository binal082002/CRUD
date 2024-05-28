import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {

    const {user, isLoggedIn} = useAuth();
    return (
        <header>
            <div className="flex justify-around items-center p-4 shadow-md">
                <div className="flex items-center gap-2 ml-0">
                <p className="text-[#913a99] text-5xl font-bold md:text-2xl">CRUD</p>
                </div>

                <ul className="flex items-center list-none gap-8 text-[#626262] text-lg font-medium md:text-base">
                    <li>
                        <Link className="text-[#53079F] text-2xl no-underline font-bold font-poppins" to="/">Home</Link>
                    </li>
                </ul>

                <div className="flex items-center gap-8 md:gap-6">
                {isLoggedIn ? 
                    ( 
                        <>
                            <Link style={{textDecoration: 'none'}} to='/logout'>
                                <button className="w-34 h-12 border border-[#3f47b3] rounded-full text-[#000000] text-lg font-medium bg-white hover:bg-gray-100 focus:outline-none md:w-28 md:h-10 md:text-base">Logout</button>
                                <span className="text-lg font-medium text-gray-700 ml-4">{user.username}</span>
                            </Link>
                        </>

                    ) : (
                        <>
                            <Link className="no-underline" to='/login'>
                                <button className="w-34 h-12 border border-[#3f47b3] rounded-full text-[#000000] text-lg font-medium bg-white hover:bg-gray-100 focus:outline-none md:w-28 md:h-10 md:text-base">Login</button>
                            </Link>
                            <Link className="no-underline" to='/register'>
                                <button className="w-34 h-12 border border-[#3f47b3] rounded-full text-[#000000] text-lg font-medium bg-white hover:bg-gray-100 focus:outline-none md:w-28 md:h-10 md:text-base">Register</button>
                            </Link>
                        </>

                    )}

                </div>
            </div>
        </header>
    )
}

export default Navbar;
