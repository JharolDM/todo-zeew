import React from 'react';
import './Card.css';

const Card = ({ task, onDelete, onToggle }) => {
  return (
    <div className="card">
      <span
        role="img"
        aria-label="Complete"
        onClick={() => onToggle(task.id)}
        style={{ cursor: 'pointer' }}
      >
        {task.completed ? '✅' : '◻️'}
      </span>
      <p className="task-name">{task.name}</p>
      <span
        role="img"
        aria-label="Delete"
        onClick={() => onDelete(task.id)}
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
      >
        ❌
      </span>
    </div>
  );
}

export default Card;
