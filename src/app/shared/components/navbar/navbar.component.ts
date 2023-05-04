import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as fromRoot from '../../../app-state';
import * as storage from '../../../app-state/states/storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: any;

  constructor(private readonly store: Store, private router: Router) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('in the header:::', data)
      this.user = data.user;
    });
  }

  logout() {
    storage.clearStorage();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
