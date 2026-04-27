import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList, ProductUpdate, ProductCondition, City, Team } from '../../../models/product';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css'
})
export class MerchComponent implements OnInit {
  private productService = inject(ProductService);

  products: ProductList[] = [];
  cities: City[] = [];
  teams: Team[] = [];

  isLoading = false;
  errorMessage = '';

  query = '';
  showOnlyMine = false;

  isEditOpen = false;
  editingProductId: number | null = null;

  replacePhotos = false;
  editFileInputs: { id: number; file: File | null }[] = [];
  private editFileInputId = 0;

  editModel: ProductUpdate = {
    name: '',
    shortDescription: '',
    description: '',
    price: 0,
    teamId: null,
    cityId: 0,
    condition: 'Iyi'
  };

  conditions: ProductCondition[] = [
    'Sifir',
    'AzKullanilmis',
    'Iyi',
    'Orta',
    'Yipranmis'
  ];

  get filteredProducts(): ProductList[] {
    const q = this.query.trim().toLowerCase();

    if (!q) return this.products;

    return this.products.filter(product =>
      product.name.toLowerCase().includes(q) ||
      (product.shortDescription ?? '').toLowerCase().includes(q) ||
      (product.teamName ?? '').toLowerCase().includes(q) ||
      (product.cityName ?? '').toLowerCase().includes(q) ||
      (product.condition ?? '').toLowerCase().includes(q) ||
      (product.userName ?? '').toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCities();
    this.loadTeams();
  }

  toggleMyProducts(): void {
    this.showOnlyMine = !this.showOnlyMine;
    this.showOnlyMine ? this.loadMyProducts() : this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Ürünler yüklenirken bir hata oluştu.';
        this.isLoading = false;
      }
    });
  }

  loadMyProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getMyProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Ürünlerin yüklenirken bir hata oluştu.';
        this.isLoading = false;
        this.showOnlyMine = false;
      }
    });
  }

  openEdit(product: ProductList, event: MouseEvent): void {
    event.stopPropagation();

    this.editingProductId = product.productId;
    this.replacePhotos = false;
    this.editFileInputs = [];

    this.editModel = {
      name: product.name,
      shortDescription: product.shortDescription ?? '',
      description: '',
      price: product.price,
      teamId: product.teamId ?? null,
      cityId: product.cityId,
      condition: (product.condition as ProductCondition) ?? 'Iyi'
    };

    this.productService.getProductById(product.productId).subscribe({
      next: (detail) => {
        this.editModel.description = detail.description ?? '';
        this.isEditOpen = true;
      },
      error: () => {
        this.isEditOpen = true;
      }
    });
  }

  closeEdit(): void {
    this.isEditOpen = false;
    this.editingProductId = null;
    this.replacePhotos = false;
    this.editFileInputs = [];
  }

  addEditFileInput(): void {
    this.editFileInputs.push({
      id: ++this.editFileInputId,
      file: null
    });
  }

  removeEditFileInput(index: number): void {
    this.editFileInputs.splice(index, 1);
  }

  onEditFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.editFileInputs[index].file = input.files[0];
  }

  trackByEditFileInputId(index: number, item: { id: number; file: File | null }): number {
    return item.id;
  }

  submitEdit(): void {
    if (!this.editingProductId) return;

    const formData = new FormData();

    formData.append('Name', this.editModel.name);
    formData.append('ShortDescription', this.editModel.shortDescription || '');
    formData.append('Description', this.editModel.description || '');
    formData.append('Price', String(this.editModel.price));
    formData.append('CityId', String(this.editModel.cityId));
    formData.append('Condition', this.editModel.condition);
    formData.append('ReplacePhotos', String(this.replacePhotos));

    if (this.editModel.teamId) {
      formData.append('TeamId', String(this.editModel.teamId));
    }

    this.editFileInputs.forEach(item => {
      if (item.file) {
        formData.append('Pictures', item.file);
      }
    });

    this.productService.updateProduct(this.editingProductId, formData).subscribe({
      next: () => {
        this.closeEdit();
        this.showOnlyMine ? this.loadMyProducts() : this.loadProducts();
      },
      error: (err) => {
        console.error('Ürün güncellenemedi:', err);
        alert('Ürün güncellenemedi.');
      }
    });
  }

  deleteProduct(product: ProductList, event: MouseEvent): void {
    event.stopPropagation();

    const confirmed = confirm(`"${product.name}" ürününü silmek istediğine emin misin?`);

    if (!confirmed) return;

    this.productService.deleteProduct(product.productId).subscribe({
      next: () => {
        this.products = this.products.filter(x => x.productId !== product.productId);
      },
      error: (err) => {
        console.error('Ürün silinemedi:', err);
        alert('Ürün silinemedi.');
      }
    });
  }

  private loadCities(): void {
    this.productService.getAllCities().subscribe({
      next: (res) => this.cities = res,
      error: () => this.cities = []
    });
  }

  private loadTeams(): void {
    this.productService.getAllTeams().subscribe({
      next: (res) => this.teams = res,
      error: () => this.teams = []
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price);
  }

  trackByProductId(index: number, item: ProductList): number {
    return item.productId;
  }

  formatCondition(condition?: string | null): string {
    if (!condition) return '';

    const map: Record<string, string> = {
      Sifir: 'Sıfır',
      AzKullanilmis: 'Az Kullanılmış',
      Iyi: 'İyi',
      Orta: 'Orta',
      Yipranmis: 'Yıpranmış'
    };

    return map[condition] || condition;
  }
}
