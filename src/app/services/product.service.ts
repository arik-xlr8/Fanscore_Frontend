import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiMessageResponse, ProductCreate, ProductDetail, ProductList, ProductUpdate } from '../../models/product';
import { City } from '../../models/city';
import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:5153/api/Product';
  private teamUrl = 'http://localhost:5153/api/Team';
  private cityUrl = 'http://localhost:5153/api/City';

  getAllProducts(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(this.baseUrl);
  }

  getProductById(productId: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/${productId}`);
  }

  createProduct(payload: ProductCreate): Observable<ProductDetail> {
    return this.http.post<ProductDetail>(this.baseUrl, payload);
  }

  updateProduct(productId: number, payload: ProductUpdate): Observable<ApiMessageResponse> {
    return this.http.put<ApiMessageResponse>(`${this.baseUrl}/${productId}`, payload);
  }

  deleteProduct(productId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.baseUrl}/${productId}`);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamUrl);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl);
  }
}
