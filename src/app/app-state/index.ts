import * as fromUser from './reducers/user.reducer';
import * as fromTodo from './reducers/task.reducer';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment.development';

export interface State {
  user: fromUser.State;
  todo: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  todo: fromTodo.reducer
}

const reducerKeys = ['user', 'todo'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: reducerKeys })(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any>{
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = !environment ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];

export const getLoginState = createFeatureSelector<fromUser.State>('user');

export const getLoggedInUser = createSelector(
  getLoginState,
  fromUser.getLoggedInUser
);

export const userSingup = createSelector(
  getLoginState,
  fromUser.userSingup
);

export const userLogin = createSelector(
  getLoginState,
  fromUser.userLogin
);

export const getTodoState = createFeatureSelector<fromTodo.State>('todo');

export const getTasks = createSelector(
  getTodoState,
  fromTodo.getTasks
)
