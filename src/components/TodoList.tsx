import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  hasAnyTodos: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoList({ todos, hasAnyTodos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="todo-list__empty">
        {hasAnyTodos
          ? 'По выбранному фильтру задач нет'
          : 'Пока задач нет — добавьте первую!'}
      </p>
    );
  }

  return (
    <ul className="todo-list">
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
