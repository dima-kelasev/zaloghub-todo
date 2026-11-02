import { FILTERS } from '../../consts/fiters';
import { pluralize } from '../../helpers/pluralize';
import type { TodoFilter } from '../../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filter: TodoFilter;
  activeCount: number;
  hasCompleted: boolean;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

export function FilterBar({
  filter,
  activeCount,
  hasCompleted,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.counter}>
        {pluralize(activeCount, 'Осталась', 'Осталось', 'Осталось')}{' '}
        {activeCount} {pluralize(activeCount, 'задача', 'задачи', 'задач')}
      </span>

      <div className={styles.buttons} role="group" aria-label="Фильтр задач">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`${styles.button}${filter === value ? ` ${styles.active}` : ''}`}
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
          className={styles.clear}
          onClick={onClearCompleted}
        >
          Удалить выполненные
        </button>
      )}
    </div>
  );
}
