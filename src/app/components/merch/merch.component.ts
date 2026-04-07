import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';import { ProductList } from '../../../models/product';
import { RouterModule } from '@angular/router';
;

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css'
})
export class MerchComponent implements OnInit {
  private productService = inject(ProductService);

  products: ProductList[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ürünler alınamadı:', err);
        this.errorMessage = 'Ürünler yüklenirken bir hata oluştu.';
        this.isLoading = false;
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price);
  }

  trackByProductId(index: number, item: ProductList): number {
    return item.productId;
  }
}
