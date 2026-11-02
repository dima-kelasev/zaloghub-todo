import { FilterBar } from './components/FilterBar';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const {
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
  } = useTodos();

  return (
    <main className="app">
      <div className="app__card">
        <h1 className="app__title">Список задач</h1>

        <TodoInput onAdd={addTodo} />

        {todos.length > 0 && (
          <FilterBar
            filter={filter}
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}

        <TodoList
          todos={filteredTodos}
          hasAnyTodos={todos.length > 0}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      </div>
    </main>
  );
}
