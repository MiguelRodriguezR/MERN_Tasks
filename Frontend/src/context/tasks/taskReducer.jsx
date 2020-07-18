import {
  PROJECT_TASKS,
  CLEAN_TASK,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  TASK_STATE,
  ACTUAL_TASK,
  UPDATE_TASK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        // tasksProject: state.tasks.filter((t) => t.project === action.payload),
        tasksProject: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksProject: [action.payload, ...state.tasksProject],
        errorTask: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        errorTask: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.filter((t) => t.id !== action.payload),
      };
    case UPDATE_TASK:
    case TASK_STATE:
      return {
        ...state,
        tasksProject: state.tasksProject.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case ACTUAL_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        selectedTask: null,
      };
    default:
      return state;
  }
};
