import React, { useEffect, useState } from 'react';

interface AddTodoProps {
  label: string;
  todoHandler: (type: string, input: string) => void;
  todo?: { text: string } | '';
}

function AddTodo({ label, todoHandler, todo = '' }: AddTodoProps) {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    todo && setInput(todo.text);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoHandler(label, input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-task">
        <input
          type="text"
          placeholder={`${label} new task`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" type="submit">
          {label} Task
        </button>
      </div>
    </form>
  );
}

export default AddTodo;
