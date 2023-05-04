import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TodoService } from 'src/app/shared/services/todo.service';
import * as todoActions from '../actions';

@Injectable({
  providedIn: 'root'
})
export class TaskEffect {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getTasks),
      exhaustMap(action =>
        this.todoService.getTasks().pipe(
          map(response => {
            console.log("response");
            console.log(response);
            return todoActions.getTasksSuccess({response});
          }),
          catchError((error: any) => of(todoActions.getTasksFailure(error)))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createTask),
      exhaustMap(action =>
        this.todoService.addTask(action.task).pipe(
          map(response => todoActions.createTaskSuccess(response)),
          catchError((error: any) => of(todoActions.createTaskFailure(error)))
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTask),
      exhaustMap(action =>
        this.todoService.editTask(action.task).pipe(
          map(response => todoActions.editTaskSuccess(response)),
          catchError((error: any) => of(todoActions.editTaskFailure(error)))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTask),
      exhaustMap(action =>
        this.todoService.deleteTask(action.taskId).pipe(
          map(response => todoActions.deleteTaskSuccess(response)),
          catchError((error: any) => of(todoActions.deleteTaskFailure(error)))
        )
      )
    )
  );

}
