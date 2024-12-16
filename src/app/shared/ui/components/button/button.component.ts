import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type Variante = "primary" | "secondary";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input()
  label: string = '';

  @Input()
  tipo: string = 'submit';

  @Input()
  class: string = '';

  @Input()
  variante: Variante = 'primary';

  @Input()
  disabled: boolean = false;

  @Output()
  btnClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled)
      this.btnClick.emit();
  }
}


