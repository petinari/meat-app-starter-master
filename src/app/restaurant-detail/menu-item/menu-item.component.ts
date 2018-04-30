import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  @Output() evento = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  clickAdicionar() {
    this.evento.emit(this.menuItem);
  }

}
