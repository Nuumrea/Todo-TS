import React, { useState } from "react";
import "./App.css";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const App = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const newTodos: ITodo[] = [...todos];

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <section className="todo-wrapper">
      <div>
        <div className="todo-title">
          <h1>To-Do List</h1>
        </div>
        <div>
          {todos.map((data: ITodo, index: number) => {
            return (
              <div key={index} className="todo-list">
                <div
                  onClick={(): void => removeTodo(index)}
                  className="todo-close"
                >
                  ✖︎
                </div>
                <div
                  style={{
                    textDecoration: data.complete ? "line-through" : "",
                  }}
                  onClick={(): void => completeTodo(index)}
                >
                  <span>{data.text}</span>
                </div>
              </div>
            );
          })}
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              className="todo-input"
              type="text"
              placeholder="New task"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <input className="todo-button" type="submit" value="Add Task" />
          </form>
        </div>
      </div>
    </section>
  );
};
export default App;
