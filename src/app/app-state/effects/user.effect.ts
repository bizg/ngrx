import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AppService } from "src/app/shared/services/app.service";
import * as userActions from '../actions';

@Injectable()
export class UserEffect {

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap(action =>
        this.appService.login(action.user).pipe(
          map(response => userActions.loginSuccess(response)),
          catchError((error: any) => of(userActions.loginFailure(error)))
        )
      )
    )
  );

  userSinguo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.singup),
      exhaustMap(action =>
        this.appService.singup(action.user).pipe(
          map(response => userActions.singupSuccess(response)),
          catchError((error: any) => of(userActions.singupFailure(error)))
        )
      )
    )
  );

}
