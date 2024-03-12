import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="card-list">
      {tasks.map((task) => (
        <Card key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default CardList;
