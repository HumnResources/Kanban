import React, { useState } from 'react';
import AddTask from './AddTask';
import './KanbanBoard.css'

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
}

interface Board {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const KanbanBoard = () => {
  const [board, setBoard] = useState<Board>({
    todo: [],
    inProgress: [],
    done: [],
  // Add a new task to the board
  });

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 100000),
      title,
      status: 'todo',
    };
    setBoard(prevBoard => ({
  // Set the dragged task
      ...prevBoard,
      todo: [...prevBoard.todo, newTask],
    }));
  };
  

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  // Remove the dragged task from the board
  };

  const handleDragEnd = () => {
    if (draggedTask) {
      const newBoard = { ...board };
      const taskIndex = newBoard[draggedTask.status].findIndex(
        t => t.id === draggedTask.id
      );
      if (taskIndex !== -1) {
        newBoard[draggedTask.status].splice(taskIndex, 1);
      }
      handleDrop(draggedTask.status);
      setBoard(newBoard);
    }
    setDraggedTask(null);
  // Add the dragged task to the board
  };
  
  const handleDrop = (status: 'todo' | 'inProgress' | 'done') => {
    if (!draggedTask) return;
  
    const existingTaskIndex = board[status].findIndex(
      (t: Task) => t.id === draggedTask.id
    );
  
    // If the task already exists in the target column, don't add it again
    if (existingTaskIndex !== -1) return;
  
    const newTask: Task = {
      id: Math.floor(Math.random() * 100000),
      title: draggedTask.title,
      status: status,
    };
  
    const newBoard = {
      ...board,
      [draggedTask.status]: board[draggedTask.status].filter(
        (t: Task) => t.id !== draggedTask.id
      ),
      [status]: [...board[status], newTask],
    };
  
    setBoard(newBoard);
    setDraggedTask(null);
  };
  
  return (
    <div className="kanban-board">
      <AddTask onAddTask={handleAddTask} />
      <div className="column">
        <h2>Todo</h2>
        {board.todo.map(task => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={() => handleDragStart(task)}
            onDragEnd={handleDragEnd}
          >
            <h3>{task.title}</h3>
          </div>
        ))}
        <div
          className="dropzone"
          onDrop={() => handleDrop('todo')}
          onDragOver={e => e.preventDefault()}
        >
          Drop here to add a task
        </div>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        {board.inProgress.map(task => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={() => handleDragStart(task)}
            onDragEnd={handleDragEnd}
          >
            <h3>{task.title}</h3>
          </div>
        ))}
        <div
          className="dropzone"
          onDrop={() => handleDrop('inProgress')}
          onDragOver={e => e.preventDefault()}
        >
          Drop here to add a task
        </div>
      </div>
      <div className="column">
        <h2>Done</h2>
        {board.done.map(task => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={() => handleDragStart(task)}
            onDragEnd={handleDragEnd}
          >
            <h3>{task.title}</h3>
          </div>
        ))}
        <div
          className="dropzone"
          onDrop={() => handleDrop('done')}
          onDragOver={e => e.preventDefault()}
        >
          Drop here to add a task
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;