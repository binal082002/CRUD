import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <>
            <section id="error-page" className="flex items-center justify-center">
                <div className="max-w-[70rem] text-center">
                    <h2 className="header text-[18vw] leading-normal animate-10s-ease-in-out infinite bg-gradient-to-b from-blue-400 to-purple-700 text-transparent bg-clip-text">
                        404
                    </h2>
                    <h4 className="mb-8 text-uppercase text-2xl">Page not found!!</h4>

    

                    <div className="btns">
                        <NavLink to="/" className="btn-link bg-white border border-[#7a7a7a] text-[#515151] font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-gray-100 hover:text-[#53079F]">Return Home</NavLink>
                        {/* <NavLink to="/contact" className="btn-link bg-white border border-[#7a7a7a] text-[#515151] font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-gray-100 hover:text-[#53079F]">Report Problem</NavLink> */}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Error;
