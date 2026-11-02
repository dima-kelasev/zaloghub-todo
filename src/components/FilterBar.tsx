import type { TodoFilter } from '../types';

interface FilterBarProps {
  filter: TodoFilter;
  activeCount: number;
  hasCompleted: boolean;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
];

export function FilterBar({
  filter,
  activeCount,
  hasCompleted,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <span className="filter-bar__counter">
        {pluralize(activeCount, 'Осталась', 'Осталось', 'Осталось')}{' '}
        {activeCount}{' '}
        {pluralize(activeCount, 'задача', 'задачи', 'задач')}
      </span>

      <div className="filter-bar__buttons" role="group" aria-label="Фильтр задач">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`filter-bar__button${filter === value ? ' filter-bar__button--active' : ''}`}
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button
          type="button"
          className="filter-bar__clear"
          onClick={onClearCompleted}
        >
          Удалить выполненные
        </button>
      )}
    </div>
  );
}

/** Склонение существительных для счётчика (1 задача, 2 задачи, 5 задач). */
function pluralize(count: number, one: string, few: string, many: string): string {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;

  if (mod100 > 10 && mod100 < 20) return many;
  if (mod10 > 1 && mod10 < 5) return few;
  if (mod10 === 1) return one;
  return many;
}
