import { PROJECT_TASKS, ADD_TASK, VALIDATE_TASK } from "../../types"

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
                tasks: [ ...state.tasks, action.payload],
                errorTask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            }
        default:
            return state
    }
}