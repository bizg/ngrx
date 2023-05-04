import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions';
import * as storage from '../states/storage';
import { User } from '../entities';

export interface State {
    user: User,
    result?: any,
    isLoading: boolean,
    isLoadingSuccess?: boolean,
    isLoadingFailure?: boolean
};

const initialState: State = {
    user: storage.getItem('user').user,
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, { user }) => ({ user, isLoading: true })),
  on(userActions.loginSuccess, (state, result) => ({ user: result.user, result, isLoading: false, isLoadingSuccess: true })),
  on(userActions.singup, (state, {user}) => ({ user, isLoading: true })),
  on(userActions.singupSuccess, (state, result) => ({ user: state.user, result, isLoading: false, isLoadingSuccess: true }))
);

export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess
  }
}

export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
}

export const userSingup = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
}
