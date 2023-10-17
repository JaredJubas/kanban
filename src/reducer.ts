// Data interface representing the task data structure
interface Data {
  [key: string]: string[];
}

// Application state structure
export interface AppState {
  data: Data; // The data property contains the task columns
  draggedItem: { task: string; column: string }; // The currently dragged item
}

// Action types to be used in Redux actions
// Sets the currently dragged item
interface SetDraggedItemAction {
  type: 'SET_DRAGGED_ITEM';
  payload: { task: string; column: string };
}

// The action for moving a task between columns
interface MoveTaskAction {
  type: 'MOVE_TASK';
  payload: { column: string; toColumn: string; task: string };
}

// Create a union type for all possible actions
type KanbanAction = SetDraggedItemAction | MoveTaskAction;

// Initial state of the application
const initialState: AppState = {
  data: {
    toDo: ['Task 1', 'Task 2'],
    inProgress: ['Task 3'],
    review: ['Task 4', 'Task 5', 'Task 6'],
    done: ['Task 7', 'Task 8'],
  },
  draggedItem: { task: '', column: '' }, // Initialize the dragged item as empty
};

// Function to handle moving a task between columns
function handleMoveTask(
  state: AppState,
  payload: MoveTaskAction['payload']
): AppState {
  const { column, toColumn, task } = payload;
  // Create a copy of the data object to avoid modifying the original state
  const updatedData = { ...state.data };
  // Push the task to the destination column
  updatedData[toColumn].push(task);
  // Find the index of the task in the source column and remove it
  const taskIndex = updatedData[column].indexOf(task);
  updatedData[column].splice(taskIndex, 1);
  // Return a new state with the updated data
  return { ...state, data: updatedData };
}

// Function that handles actions to update the state
export const kanbanReducer = (
  state: AppState = initialState, // Set the initial state if no state is provided
  action: KanbanAction // Accept actions of type KanbanAction
) => {
  switch (action.type) {
    case 'SET_DRAGGED_ITEM':
      // Update the dragged item in the state
      return { ...state, draggedItem: action.payload };
    case 'MOVE_TASK':
      // Handle moving a task between columns
      return handleMoveTask(state, action.payload);
    default:
      // For other actions, return the current state
      return state;
  }
};
