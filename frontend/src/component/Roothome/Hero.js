import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';

// correct one 
const Hero = () => {
        return (
            <>
            <div className='bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 lg:bg-contain lg:bg-[url(../)mx-auto w-100 h-100 containerbg flex'>
                <div className="mx-auto flex flex-col mt-[90px]">
                    <div className='mt-[-10vh]'>
                        <Link to="/login" className='ml-1px lg:ml-[47vw] bg-yellow-300 font-semibold text-black text-xl lg:text-2xl border border-yellow-100 px-10 py-3 hover:bg-blue-100 hover:font-extrabold rounded-full'>GET START FOR FREE</Link>
                    </div>
                </div>
            </div>
            </>
        );
    };
export default Hero