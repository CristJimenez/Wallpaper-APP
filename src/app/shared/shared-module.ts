import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from './components/button/button.component';
import { User } from './services/user/user';
import { RouterModule } from '@angular/router';

const modules = [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule ];
const components = [ InputComponent, ButtonComponent ];
const providers = [ User ];

@NgModule({
  declarations: [ ...components ],
  providers: [ ...providers ],
  imports: [...modules ],
  exports: [ ...modules, ...components ]
})
export class SharedModule { }
