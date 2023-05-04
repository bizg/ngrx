import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LeftnavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LeftnavComponent
  ]
})
export class SharedModule { }
