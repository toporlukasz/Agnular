import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from '../shoplist/shoplist.component';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  name = '';
  quantity = 1;
  price = 0;
  isHover: boolean = false;
  @ViewChild('listComponent') listComponent!: ListComponent;
  nameValidationMessage: string = '';
  quantityValidationMessage: string = '';

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  async onSubmit() {
    const newItem = {
      name: this.name,
      quantity: this.quantity,
      price: this.price,
    };

    if (newItem.name) {
      if (newItem.quantity > 0) {
        const photoURL = await this.getPhotoByProductName(newItem.name);

        this.shoppingListService.addItem(
          newItem.name,
          newItem.quantity,
          newItem.price,
          photoURL || ''
        );

        this.name = '';
        this.quantity = 1;
        this.price = 0;
        this.nameValidationMessage = '';
        this.quantityValidationMessage = '';
        this.listComponent.calculateTotalPrice();
      } else {
        this.quantityValidationMessage =
          'Please enter a quantity greater than zero.';
        this.nameValidationMessage = '';
      }
    } else {
      this.nameValidationMessage = 'Please enter the product name.';
      this.quantityValidationMessage = '';
    }
  }

  async getPhotoByProductName(productName: string): Promise<string | null> {
    const accessKey = 'C1_CeLbRECRVNiD77ykfnyoY3P4i3zTRPw83QHROAZc';

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${productName}&client_id=${accessKey}`
      );
      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
