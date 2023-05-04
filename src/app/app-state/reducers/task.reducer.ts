import { Action, createReducer, on } from '@ngrx/store';
import * as todoActions from '../actions';
import * as storage from '../states/storage';
import { Task } from '../entities';

export interface State {
    tasks?: Task[];
    currentTask?: Task;
    deleteTaskId?: any;
    result?: any;
    isLoading?: boolean;
    isLoadingSuccess?: boolean;
    isLoadingFailureFailure?: boolean;
};

const initialState: State = {
    tasks: storage.getItem('todo').task,
    currentTask: {},
    deleteTaskId: '',
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailureFailure: false
};

const todoReducer = createReducer(
  initialState,
  // Get Tasks
  on(todoActions.getTasks, (state) => ({...state, isLoading: true })),
  on(todoActions.getTasksSuccess, (state, result) => ({ tasks: result.response, isLoading: false, isLoadingSuccess: true })),

  // Create Tasks
  on(todoActions.createTask, (state, { task }) => ({ ...state, isLoading: true, currentTask: task })),
  on(todoActions.createTaskSuccess, (state, result) => {
    const tasks = state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    }
  }),

  // Edit Tasks
  on(todoActions.editTask, (state, { task }) => ({ ...state, isLoading: true, currentTask: task })),
  on(todoActions.editTaskSuccess, (state, result) => {
    let tasks = state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    const currentTask = state.currentTask ? JSON.parse(JSON.stringify(state.currentTask)) : {};
    tasks = tasks.map((task: Task) => {
      if(task.id == currentTask.id) {
        task = currentTask
      }
      return task;
    });

    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    }
  }),

  // Delete Tasks
  on(todoActions.deleteTask, (state, { taskId }) => ({ ...state, isLoading: true, deleteTaskId: taskId })),
  on(todoActions.deleteTaskSuccess, (state, result) => {
    let tasks = state.tasks ? JSON.parse(JSON.stringify(state.tasks)) : [];
    if(result.status) {
      tasks = tasks.filter((task: Task) => task.id !== state.deleteTaskId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    }
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return todoReducer(state, action);
}

export const getTasks = (state: State) => {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
}
