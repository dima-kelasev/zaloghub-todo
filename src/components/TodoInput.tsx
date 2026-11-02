import { useState } from 'react';
import type { FormEvent } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => boolean;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const added = onAdd(value);
    if (added) {
      setValue('');
      setShowError(false);
    } else {
      // Пустая строка или одни пробелы — показываем подсказку
      setShowError(true);
    }
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit} noValidate>
      <div className="todo-input__row">
        <label className="visually-hidden" htmlFor="new-todo">
          Новая задача
        </label>
        <input
          id="new-todo"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (showError) setShowError(false);
          }}
          placeholder="Что нужно сделать?"
          autoComplete="off"
          aria-invalid={showError}
          aria-describedby={showError ? 'new-todo-error' : undefined}
        />
        <button type="submit">Добавить</button>
      </div>
      {showError && (
        <p className="todo-input__error" id="new-todo-error" role="alert">
          Задача не может быть пустой
        </p>
      )}
    </form>
  );
}
