import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.css'],
})
export class ListComponent implements OnInit {
  items: Item[] = [];
  totalPrice: number = 0;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.getItems().subscribe((items: Item[]) => {
      this.items = items;
      this.calculateTotalPrice();
      this.refreshList();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.shoppingListService.totalPrice;
  }

  removeItem(item: Item) {
    this.shoppingListService.removeItem(item);
    this.calculateTotalPrice();
  }

  refreshList(): void {
    this.shoppingListService.getItems().subscribe((items: Item[]) => {
      this.items = items;
      this.calculateTotalPrice();
    });
  }
}
