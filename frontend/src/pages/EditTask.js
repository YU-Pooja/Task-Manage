import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (error) {
        console.error('Error fetching task', error);
      }
    };
    fetchTask();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { title, description, status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Edit Task</h2>
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">Description</label>
          <textarea
            id="description"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 text-lg font-medium mb-2">Status</label>
          <select
            id="status"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors w-full"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
