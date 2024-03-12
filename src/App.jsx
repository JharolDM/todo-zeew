import React, { useState } from 'react';
import './App.css';
import AppContainer from './Components/Container/AppContainer';
import TodoTitle from './Components/TodoTitle/TodoTitle';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  const handleAddTask = () => {
    if (taskName.length < 3 || taskName.length > 30) {
      alert('Task name must be between 3 and 30 characters.');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setShowModal(false);
    setTaskName('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => (showCompleted ? true : !task.completed));

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <AppContainer>
      <div className="container">
        <TodoTitle
          title={`To-Do List (${incompleteTasksCount} of ${
            tasks.length
          } tasks remaining)`}
        />
        <Search handleSearch={handleSearch} />
        <CardList
          tasks={currentTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
        <button onClick={() => setShowModal(true)} className="add-button">
          ➕ Add Task
        </button>
        <label className="show-completed-label">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={handleToggleCompleted}
          />
          Show Completed Tasks
        </label>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {'<'}
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {'>'}
          </button>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={() => setShowModal(false)}>
                ❌
              </span>
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
