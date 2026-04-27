import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { City, ProductCondition, Team } from '../../../models/product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  cities: City[] = [];
  teams: Team[] = [];

  isSubmitting = false;
  errorMessage = '';

  fileInputs: { id: number; file: File | null }[] = [];
  private fileInputId = 0;

  conditions: ProductCondition[] = [
    'Sifir',
    'AzKullanilmis',
    'Iyi',
    'Orta',
    'Yipranmis'
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    shortDescription: ['', [Validators.maxLength(255)]],
    description: [''],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    teamId: [null as number | null],
    cityId: [null as number | null, [Validators.required]],
    condition: ['Iyi' as ProductCondition, [Validators.required]]
  });

  ngOnInit(): void {
    this.loadCities();
    this.loadTeams();
  }

  addFileInput(): void {
    this.fileInputs.push({
      id: ++this.fileInputId,
      file: null
    });
  }

  removeFileInput(index: number): void {
    this.fileInputs.splice(index, 1);
  }

  trackByFileInputId(index: number, item: { id: number; file: File | null }): number {
    return item.id;
  }

  onSingleFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.fileInputs[index].file = input.files[0];
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const value = this.form.getRawValue();
    const formData = new FormData();

    formData.append('Name', value.name!);
    formData.append('ShortDescription', value.shortDescription || '');
    formData.append('Description', value.description || '');
    formData.append('Price', String(value.price));
    formData.append('CityId', String(value.cityId));
    formData.append('Condition', value.condition!);

    if (value.teamId) {
      formData.append('TeamId', String(value.teamId));
    }

    this.fileInputs.forEach(item => {
      if (item.file) {
        formData.append('Pictures', item.file);
      }
    });

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        this.router.navigate(['/merch', res.productId]);
      },
      error: (err) => {
        console.error('Ürün oluşturulamadı:', err);
        this.errorMessage = 'Ürün oluşturulamadı. Bilgileri kontrol edip tekrar dene.';
        this.isSubmitting = false;
      }
    });
  }

  private loadCities(): void {
    this.productService.getAllCities().subscribe({
      next: (res) => this.cities = res,
      error: (err) => {
        console.error('Şehirler alınamadı:', err);
        this.cities = [];
      }
    });
  }

  private loadTeams(): void {
    this.productService.getAllTeams().subscribe({
      next: (res) => this.teams = res,
      error: (err) => {
        console.error('Takımlar alınamadı:', err);
        this.teams = [];
      }
    });
  }
}
