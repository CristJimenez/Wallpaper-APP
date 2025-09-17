import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from './components/button/button.component';
import { User } from './services/user/user';
import { RouterModule } from '@angular/router';
import { ActionSheet } from './providers/actionSheet/action-sheet';
import { ToggleTranslateComponent } from './components/toggleTranslate/toggle-translate.component';
import { LinkComponent } from './components/link/link.component';
import { CardComponent } from './components/card/card.component';
import { FloatingButtonComponent } from './components/floatingButton/floating-button.component';

const modules = [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule ];
const components = [ InputComponent, ButtonComponent, ToggleTranslateComponent, LinkComponent, CardComponent, FloatingButtonComponent ];
const providers = [ User, ActionSheet ];

@NgModule({
  declarations: [ ...components ],
  providers: [ ...providers ],
  imports: [...modules ],
  exports: [ ...modules, ...components ]
})
export class SharedModule { }
