import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private items: Item[] = [];
  private itemsSubject = new BehaviorSubject<Item[]>(this.items);
  itemsUpdated: any;
  totalPrice: number = 0;

  constructor() {}

  addItem(name: string, quantity: number, price: number, imageUrl: string) {
    const newItem: Item = { name, quantity, price, imageUrl }; // Dodano właściwość imageUrl
    this.items.push(newItem);
    this.calculateTotalPrice();
    this.itemsSubject.next([...this.items]);
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  getItems() {
    return this.itemsSubject.asObservable();
  }

  removeItem(item: Item) {
    const index = this.items.findIndex((i) => i === item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.itemsSubject.next([...this.items]);
      this.calculateTotalPrice();
    }
  }
}
