import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-project';

  showAddProductForm: boolean = false;

  constructor(private router: Router) {}

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
    if (this.showAddProductForm) {
      this.router.navigate(['/add-product']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
