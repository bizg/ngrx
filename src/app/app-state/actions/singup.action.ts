import { createAction, props } from "@ngrx/store";
import { User } from "../entities";

export const USER_SINGUP = '[SingUp Page] SingUp';
export const USER_SINGUP_SUCCESS = '[SingUp Page] SingUp Success';
export const USER_SINGUP_FAILURE = '[SingUp Page] SingUp Failure';

export const singup = createAction(
  USER_SINGUP,
  props<{user: User}>()
);

export const singupSuccess = createAction(
  USER_SINGUP_SUCCESS,
  props<any>()
);

export const singupFailure = createAction(
  USER_SINGUP_FAILURE,
  props<{message: string}>()
);
