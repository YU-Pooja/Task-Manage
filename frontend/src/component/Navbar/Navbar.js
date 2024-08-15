import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
// import { useSelector } from 'react-redux';

const Navbar = () => {
  const [MobileNav,setMobileNav] = useState("hidden");
  
  return (
    <>
      <nav className="h-20 z-50 relative flex bg-yellow-300 text-zinc-800 px-8 py-1 items-center justify-between">
        <div className="flex items-center justify-evenly">
          <FaTasks className='w-10 h-10'/>
          <div className="text-2xl px-3 font-semibold">TASK MANAGER</div>
        </div>
        <div className=' block flex gap-2 items-center'>
          <div className='hidden md:flex gap-4'>  
          </div>
          <div className='hidden md:flex gap-2'>
          <Link to="/" className='font-semibold px-4 py-1 border rounded bg-white border-blue-900 hover:bg-blue-300 hover:text-zinc-800 transition-all duration-300 text-xl'>HOME</Link>
          <Link to="/login" className='font-semibold px-4 py-1 border rounded bg-white border-blue-900 hover:bg-blue-300 hover:text-zinc-800 transition-all duration-300 text-xl'>LogIn</Link>
            <Link to="/register" className='font-semibold px-4 py-1 border rounded bg-white border-blue-900 hover:bg-blue-300 hover:text-zinc-800 transition-all duration-300 text-xl'>SignUp</Link>
          </div>
          <button className='block md:hidden text-black text-2xl hover:text-gray-300' onClick={()=>(MobileNav ==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        <Link to="/LogIn" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border rounded border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
        <Link to="/SignUp" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
      </div>
    </>

  );
}

export default Navbar