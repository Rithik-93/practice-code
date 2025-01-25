import React from "react";
import { useTaskStore } from "./x";

const TaskManager = () => {
  const {
    tasks,
    filteredTasks,
    filter,
    addTask,
    removeTask,
    toggleTask,
    setFilter,
    clearCompleted,
  } = useTaskStore();

  const handleAddTask = () => {
    const title = prompt("Enter task title:");
    if (title) addTask(title);
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Filter Controls */}
      <div>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          disabled={filter === "incomplete"}
        >
          Incomplete
        </button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks().map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
};

export default TaskManager;
