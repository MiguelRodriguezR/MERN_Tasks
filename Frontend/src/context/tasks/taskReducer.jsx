import { PROJECT_TASKS, ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE, ACTUAL_TASK } from "../../types"

export default (state, action) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                tasksProject: state.tasks.filter(t => t.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload , ...state.tasks],
                errorTask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload)
            }
        case TASK_STATE:
            return {
                ...state,
                tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        default:
            return state
    }
}