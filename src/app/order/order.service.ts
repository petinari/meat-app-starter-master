import {Injectable} from '@angular/core';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import { HttpClient } from '@angular/common/http';
import {Order} from './order.model';
import {Observable} from 'rxjs/Observable';
import {MEAT_API} from '../app.api';


@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

  itensValue(): number {
    return this.cartService.total();
  }

  cartItens(): CartItem[] {
    return this.cartService.itens;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }
  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }
  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }
  checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order).map(i => i.id);
  }
  clear() {
    this.cartService.clear();
  }

}
