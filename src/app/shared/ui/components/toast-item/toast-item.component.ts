import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ToastService } from '../../../services/toast.service';
import { ToastType } from '../../../models/toast';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.css']
})
export class ToastItemComponent {
  @Input()
  message!: string;

  @Input()
  type!: ToastType;

  @Input()
  toastkey!: number;

  constructor(private readonly toastService: ToastService) {}

  remove() {
    this.toastService.remove(this.toastkey);
  }
}
