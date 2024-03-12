import './TodoTitle.css';

const TodoTitle = ({ title }) => {
  return (
    <div className="todo-title">
      <h2>{title}</h2>
    </div>
  );
}

export default TodoTitle;
