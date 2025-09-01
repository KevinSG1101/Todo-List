import "./card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{props.task.taskName}</h1>
        <p>{props.task.taskDescription}</p>
      </div>
      <div className="card-buttons">
        <button onClick={() => props.editTodo(props.task)}>Edit</button>
        <button onClick={() => props.deleteTodo(props.task.id)}>Done</button>
      </div>
    </div>
  );
}

export default Card;
