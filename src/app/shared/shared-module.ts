import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from './components/button/button.component';

const modules = [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule ];
const components = [ InputComponent, ButtonComponent ]

@NgModule({
  declarations: [ ...components ],
  imports: [...modules ],
  exports: [ ...modules, ...components ]
})
export class SharedModule { }
