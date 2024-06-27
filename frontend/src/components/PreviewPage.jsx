import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <h1 className="text-3xl font-bold">Todo List</h1>
      <div className="flex space-x-8">
        <Input
          placeholder="Add a todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <div key={index} className="flex  justify-between items-center p-2 border-b-2 border-gray-200">
            <span>{todo}</span>
            <Button onClick={() => handleDeleteTodo(index)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;