import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required";
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid";
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('http://localhost:5000/api/register', { name, email, password });
        navigate('/login');
      } catch (error) {
        console.error('Error registering', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Create an Account</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            className={`border p-3 rounded-lg w-full focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-yellow-500`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            className={`border p-3 rounded-lg w-full focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-yellow-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            className={`border p-3 rounded-lg w-full focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-yellow-500`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        
        <button type="submit" className="bg-yellow-500 text-blue-800 font-bold p-3 w-full rounded-lg hover:bg-yellow-600 transition duration-300">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
      





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/register', { name, email, password });
//       navigate('/login');
//     } catch (error) {
//       console.error('Error registering', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Create an Account</h2>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
//           <input
//             type="text"
//             id="name"
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" className="bg-yellow-500 text-blue-800 font-bold p-3 w-full rounded-lg hover:bg-yellow-600 transition duration-300">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;
