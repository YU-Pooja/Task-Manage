import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    const fetchStatusCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching status count', error);
      }
    };

    fetchTasks();
    fetchStatusCount();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-dark-blue mb-6">Task List</h2>
      <Link to="/tasks/create" className="bg-yellow-500 text-white p-3 rounded-lg shadow-md hover:bg-yellow-600 transition-colors mb-6 inline-block">
        Create Task
      </Link>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-dark-blue mb-4">Status Counts</h3>
        <div className="flex flex-col md:flex-row md:flex-wrap md:space-x-4">
          {statusCounts.map((statusCount, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-2 md:mb-0 md:w-1/3">
              <span className="font-medium text-dark-blue">{statusCount.status}:</span> {statusCount.count}
            </div>
          ))}
        </div>
      </div>


      <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-4">
        {tasks.map(task => (
          <li key={task.id} className="mb-4 md:w-1/3 md:mb-4 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
              <h3 className="text-xl font-bold text-dark-blue mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2 flex-grow">{task.description}</p>
              <p className="text-sm text-gray-600 mb-4">Status: {task.status}</p>
              <div className="flex flex-col md:flex-row md:gap-2">
                <Link to={`/tasks/edit/${task.id}`} className="text-blue-500 hover:underline border py-1 px-3 bg-yellow-300 border-black rounded mb-2 md:mb-0">Edit</Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>




    </div>
  );
}

export default TaskList;