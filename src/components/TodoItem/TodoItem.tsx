import type { Todo } from '../../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className={`${styles.item}${todo.completed ? ` ${styles.completed}` : ''}`}>
      <label className={styles.label}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={styles.text}>{todo.text}</span>
      </label>
      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(todo.id)}
        aria-label={`Удалить задачу «${todo.text}»`}
      >
        ✕
      </button>
    </li>
  );
}
