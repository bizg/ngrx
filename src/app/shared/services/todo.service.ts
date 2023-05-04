import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/app-state/entities';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${environment.rootUrl}/tasks`);
  }

  addTask(task: any) {
    return this.http.post(`${environment.rootUrl}/task`, { task });
  }

  editTask(task: any) {
    return this.http.put(`${environment.rootUrl}/task`, { task })
  }

  deleteTask(taskId: any) {
    return this.http.delete(`${environment.rootUrl}/task/${taskId}`)
  }

}
