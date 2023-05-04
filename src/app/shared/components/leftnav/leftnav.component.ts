import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent {
  constructor() { }

  gotoModule(moduleName: string) {
    if (moduleName === 'todos') {
      window.location.href = `${environment}/todos`
    } else if (moduleName === 'tasks') {
      window.location.href = `${environment}/tasks`
    }
  }
}
