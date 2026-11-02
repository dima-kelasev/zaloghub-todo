import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-item__text">{todo.text}</span>
      </label>
      <button
        type="button"
        className="todo-item__remove"
        onClick={() => onRemove(todo.id)}
        aria-label={`Удалить задачу «${todo.text}»`}
      >
        ✕
      </button>
    </li>
  );
}
