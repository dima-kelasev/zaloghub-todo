import type { Todo } from '../../types';
import { TodoItem } from '../TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  hasAnyTodos: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoList({ todos, hasAnyTodos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className={styles.empty}>
        {hasAnyTodos
          ? 'По выбранному фильтру задач нет'
          : 'Пока задач нет — добавьте первую!'}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
