import React from 'react';
import './KanbanBoard.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './reducer';

interface TaskProps {
  task: string;
  column: string;
  onDragStart: (task: string, column: string) => void;
}

// Represents an individual task item in the board
const Task: React.FC<TaskProps> = ({ task, column, onDragStart }) => {
  return (
    <div
      className="task"
      draggable
      // Trigger the onDragStart function when dragging starts
      onDragStart={() => onDragStart(task, column)}
    >
      {task}
    </div>
  );
};

// Helper function to format column names for display
function formatColumnName(column: string): string {
  // Use a regular expression to split camelCase words
  const words = column.split(/(?=[A-Z])/);
  // Capitalize the first letter of each word and join them with a space
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// KanbanBoard component represents the main board and its columns
export const KanbanBoard: React.FC = () => {
  const data = useSelector((state: AppState) => state.data);
  const draggedItem = useSelector((state: AppState) => state.draggedItem);
  const dispatch = useDispatch();

  // Handler for when a task is dragged
  const handleDragStart = (task: string, column: string) => {
    // Dispatch an action to set the dragged item in the store
    dispatch({ type: 'SET_DRAGGED_ITEM', payload: { task, column } });
  };

  // Handler for when a task is dropped into a new column
  const handleOnDrop = (toColumn: string) => {
    const { column, task } = draggedItem;
    // Check if the task is moved to a different column
    if (column !== toColumn) {
      // Dispatch an action to move the task in the store
      dispatch({
        type: 'MOVE_TASK',
        payload: { column, toColumn, task },
      });
    }
  };

  // Handler to allow drag and drop interactions
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent the default behavior to enable the drop
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <h1>Kanban Board</h1>
      </div>
      <div className="column-container">
        {Object.keys(data).map((column) => (
          <div
            key={column}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleOnDrop(column)}
          >
            <h2>{formatColumnName(column)}</h2>
            {data[column].map((task, index) => (
              <Task
                key={index}
                task={task}
                column={column}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
