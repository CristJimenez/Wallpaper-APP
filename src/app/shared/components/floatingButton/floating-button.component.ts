import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ColorType =  "danger" | "dark" | "light" | "medium" | "primary" | "secondary" | "success" | "tertiary" | "warning";

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: false,
})
export class FloatingButtonComponent  implements OnInit {

  @Input() color: ColorType = 'primary';
  @Input() icon: string = '';
  @Input() side: string = '';
  @Input() buttons: { icon: string, action: string }[] = [];
  @Output() buttonClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public onClick(action: string) {
    this.buttonClick.emit(action);
  }

}
