import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-light-blue min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-dark-blue mb-6">Create Task</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-dark-blue text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-dark-blue text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>
        <button type="submit" className="bg-dark-blue text-white p-2 rounded-md w-full hover:bg-dark-blue-dark transition-colors">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;