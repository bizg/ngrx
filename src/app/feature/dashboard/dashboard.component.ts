import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../shared/services/todo.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as todoActions from '../../app-state/actions';
import * as fromRoot from '../../app-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  tasks: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private readonly store: Store) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.user = data.user);

    this.store.select(fromRoot.getTasks).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.tasks = data.tasks);
  }

  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    assignee: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });


  onSubmit() {
    console.log(this.todoForm.value);
    const task = {
      createdBy: this.user.email,
      task: this.todoForm.value.task,
      assignee: this.todoForm.value.assignee,
      status: this.todoForm.value.status
    };
    this.store.dispatch(todoActions.createTask({task}));
    this.todoForm.reset();
  }

  deleteTask(taskId: any) {
    console.log('deleting this task:::', taskId);
    this.store.dispatch(todoActions.deleteTask({taskId}));
  }

  editTask(task: any) {
    console.log('editing this task:::', task);
    this.store.dispatch(todoActions.editTask({task}));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(todoActions.getTasks());
  }

}
