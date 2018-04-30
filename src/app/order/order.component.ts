import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from './order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailValidator = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberValidator = /^[0-9]*$/

  orderForm: FormGroup;

  delivery = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão Débito', value: 'DEB'},
    {label: 'Cartão Crédito', value: 'CRE'}
  ];




  constructor(private orderService: OrderService, private _router: Router, private _formBuilder: FormBuilder) {
  }
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    console.log('asdasdasd')
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      console.log('asdasdasd')
      return undefined;
    }
    if (email.value !== emailConfirmation.value) {
      console.log('asdasdasd')
      return {emailNotMatch: true};

    }
    console.log('asdasdasd')
    return undefined;
  }

  ngOnInit() {
    this.orderForm = this._formBuilder.group(
      {
        name: this._formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this._formBuilder.control('', [Validators.required, Validators.pattern(this.emailValidator)]),
        emailConfirmation: this._formBuilder.control('', [Validators.required, Validators.pattern(this.emailValidator)]),
        address: this._formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        number: this._formBuilder.control('', [Validators.required, Validators.pattern(this.numberValidator)]),
        optionalAddress: '',
        paymentOption: this._formBuilder.control('', [Validators.required])
      }, {validator: OrderComponent.equalsTo});
  }



  itensValue(): number {
    return this.orderService.itensValue();
  }


  cartItens(): CartItem[] {
    return this.orderService.cartItens();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }
  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }
  remove(item: CartItem) {
    this.orderService.remove(item);
  }
  checkOrder(order: Order) {
    order.orderItens = this.cartItens().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).subscribe(
      (i: string) => {
        this._router.navigate(['/order-summary']);
        this.orderService.clear();
      }
    )
    console.log(order);
  }


}
