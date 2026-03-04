import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Condition = 'Yeni' | 'Az Kullanılmış' | 'İyi' | 'Koleksiyon';

interface MerchItem {
  id: number;
  title: string;
  desc: string;
  category: 'Forma' | 'Atkı' | 'Mont' | 'Taraftar' | 'İmzalı';
  team: string;
  condition: Condition;
  price: number;
  oldPrice?: number;
  location: string;
  shipping: 'Ücretsiz Kargo' | 'Hızlı Kargo' | 'Alıcı Öder';
  imageUrl: string;
  isSigned?: boolean;
  stock: number;
}

interface CartLine {
  item: MerchItem;
  qty: number;
}

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css'
})
export class MerchComponent {
  query = '';
  selectedCategory: 'Tümü' | MerchItem['category'] = 'Tümü';
  sortBy: 'Önerilen' | 'Fiyat Artan' | 'Fiyat Azalan' = 'Önerilen';

  cartOpen = false;

  categories: Array<'Tümü' | MerchItem['category']> = ['Tümü', 'Forma', 'Atkı', 'Mont', 'Taraftar', 'İmzalı'];

  items: MerchItem[] = [
    {
      id: 1,
      title: '2. El İç Saha Forması 23/24',
      desc: 'Orijinal, küçük izler var. Fotoğraflar gerçek ürün.',
      category: 'Forma',
      team: 'Fenerbahçe',
      condition: 'İyi',
      price: 1450,
      oldPrice: 1799,
      location: 'İstanbul',
      shipping: 'Hızlı Kargo',
      imageUrl: 'https://picsum.photos/seed/jersey1/700/700',
      stock: 2
    },
    {
      id: 2,
      title: 'Koleksiyon Atkısı (Vintage)',
      desc: 'Stadyum serisi, dokusu kalın. Kışlık.',
      category: 'Atkı',
      team: 'Galatasaray',
      condition: 'Koleksiyon',
      price: 690,
      location: 'Ankara',
      shipping: 'Ücretsiz Kargo',
      imageUrl: 'https://picsum.photos/seed/scarf1/700/700',
      stock: 5
    },
    {
      id: 3,
      title: 'İmzalı Forma (Sertifikalı)',
      desc: 'Sertifika mevcut. Çerçevelenmeye uygun kondisyon.',
      category: 'İmzalı',
      team: 'Beşiktaş',
      condition: 'Koleksiyon',
      price: 8900,
      location: 'İzmir',
      shipping: 'Ücretsiz Kargo',
      imageUrl: 'https://picsum.photos/seed/signed1/700/700',
      isSigned: true,
      stock: 1
    },
    {
      id: 4,
      title: 'Taraftar Montu',
      desc: 'Rüzgar kesici, kapüşonlu. Kollar temiz.',
      category: 'Mont',
      team: 'Trabzonspor',
      condition: 'Az Kullanılmış',
      price: 2150,
      oldPrice: 2690,
      location: 'Bursa',
      shipping: 'Alıcı Öder',
      imageUrl: 'https://picsum.photos/seed/jacket1/700/700',
      stock: 3
    },
    {
      id: 5,
      title: 'Taraftar Şapkası',
      desc: 'Ayarlanabilir. Güneşlik sert, formu iyi.',
      category: 'Taraftar',
      team: 'Fenerbahçe',
      condition: 'İyi',
      price: 420,
      location: 'Antalya',
      shipping: 'Ücretsiz Kargo',
      imageUrl: 'https://picsum.photos/seed/cap1/700/700',
      stock: 12
    },
    {
      id: 6,
      title: '2. El Deplasman Forması 22/23',
      desc: 'Ürün yıkandı, numara baskısı sağlam.',
      category: 'Forma',
      team: 'Galatasaray',
      condition: 'Az Kullanılmış',
      price: 1650,
      location: 'İstanbul',
      shipping: 'Hızlı Kargo',
      imageUrl: 'https://picsum.photos/seed/jersey2/700/700',
      stock: 2
    },
    {
      id: 7,
      title: 'İmzalı Atkı (Sınırlı Seri)',
      desc: 'Özel seri, koleksiyonluk.',
      category: 'İmzalı',
      team: 'Beşiktaş',
      condition: 'Koleksiyon',
      price: 2450,
      location: 'Kocaeli',
      shipping: 'Ücretsiz Kargo',
      imageUrl: 'https://picsum.photos/seed/signed2/700/700',
      isSigned: true,
      stock: 2
    },
    {
      id: 8,
      title: 'Taraftar Bayrağı (Büyük Boy)',
      desc: '2x1.5m, duvar/stadyum için ideal.',
      category: 'Taraftar',
      team: 'Trabzonspor',
      condition: 'Yeni',
      price: 560,
      location: 'Samsun',
      shipping: 'Alıcı Öder',
      imageUrl: 'https://picsum.photos/seed/flag1/700/700',
      stock: 8
    },
  ];

  cart: CartLine[] = [];

  get filteredItems(): MerchItem[] {
    const q = this.query.trim().toLowerCase();

    let list = this.items.filter(i => {
      const matchesQ =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.team.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q);
      const matchesCat = this.selectedCategory === 'Tümü' || i.category === this.selectedCategory;
      return matchesQ && matchesCat;
    });

    if (this.sortBy === 'Fiyat Artan') list = [...list].sort((a, b) => a.price - b.price);
    if (this.sortBy === 'Fiyat Azalan') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  addToCart(item: MerchItem) {
    if (item.stock <= 0) return;

    const line = this.cart.find(x => x.item.id === item.id);
    if (line) {
      if (line.qty >= item.stock) return;
      line.qty += 1;
    } else {
      this.cart.push({ item, qty: 1 });
    }
    this.cartOpen = true;
  }

  inc(line: CartLine) {
    if (line.qty >= line.item.stock) return;
    line.qty += 1;
  }

  dec(line: CartLine) {
    line.qty -= 1;
    if (line.qty <= 0) this.cart = this.cart.filter(x => x.item.id !== line.item.id);
  }

  remove(line: CartLine) {
    this.cart = this.cart.filter(x => x.item.id !== line.item.id);
  }

  clearCart() {
    this.cart = [];
  }

  get cartCount(): number {
    return this.cart.reduce((s, x) => s + x.qty, 0);
  }

  get subtotal(): number {
    return this.cart.reduce((s, x) => s + x.qty * x.item.price, 0);
  }

  formatPrice(n: number) {
    return new Intl.NumberFormat('tr-TR').format(n);
  }

  setCategory(cat: any) {
    this.selectedCategory = cat;
  }

  trackByIndex = (index: number) => index;
}
