import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Todo, TodoFilter } from '../types';

const STORAGE_KEY = 'zaloghub-todos';

/** Читает задачи из localStorage. При повреждённых данных возвращает пустой список. */
function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Отбрасываем записи с невалидной структурой, чтобы не уронить приложение
    return parsed.filter(
      (item): item is Todo =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Todo).id === 'string' &&
        typeof (item as Todo).text === 'string' &&
        typeof (item as Todo).completed === 'boolean',
    );
  } catch {
    return [];
  }
}

interface UseTodosResult {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  activeCount: number;
  hasCompleted: boolean;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (text: string) => boolean;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

/** Инкапсулирует состояние задач и их синхронизацию с localStorage. */
export function useTodos(): UseTodosResult {
  // Ленивая инициализация: читаем localStorage один раз при монтировании
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<TodoFilter>('all');

  // Сохраняем задачи при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [todo, ...prev]);
    return true;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const hasCompleted = activeCount < todos.length;

  return {
    todos,
    filteredTodos,
    filter,
    activeCount,
    hasCompleted,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  };
}
