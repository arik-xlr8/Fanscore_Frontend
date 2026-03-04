import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TimeTag = 'Bugün' | 'Yarın' | 'Hafta Sonu' | 'Her Zaman';

interface HaliSahaItem {
  id: number;
  name: string;
  desc: string;
  location: string;
  timeTag: TimeTag;
  pitch: '5v5' | '6v6' | '7v7' | '8v8';
  pricePerHour: number;
  contactText: string;
  imageUrl: string;
}

@Component({
  selector: 'app-hali-saha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hali-saha.component.html',
  styleUrl: './hali-saha.component.css'
})
export class HaliSahaComponent {
  query = '';
  selectedTime: TimeTag | 'Tümü' = 'Tümü';
  sortBy: 'Önerilen' | 'Fiyat Artan' | 'Fiyat Azalan' = 'Önerilen';

  timeTags: Array<'Tümü' | TimeTag> = ['Tümü', 'Bugün', 'Yarın', 'Hafta Sonu', 'Her Zaman'];

  items: HaliSahaItem[] = [
    {
      id: 1,
      name: 'Konyaaltı Halı Saha',
      desc: '2 kişi, 1’i kaleci aranıyor. 21:00–22:00 maç ayarlandı.',
      location: 'Antalya / Konyaaltı',
      timeTag: 'Bugün',
      pitch: '7v7',
      pricePerHour: 1800,
      contactText: 'WhatsApp ile yaz',
      imageUrl: 'https://picsum.photos/seed/halisaha1/900/600'
    },
    {
      id: 2,
      name: 'Kepez Arena Halı Saha',
      desc: '3 kişi aranıyor. Defans ağırlıklı oyuncu tercih.',
      location: 'Antalya / Kepez',
      timeTag: 'Yarın',
      pitch: '6v6',
      pricePerHour: 1500,
      contactText: 'Telefon ile ara',
      imageUrl: 'https://picsum.photos/seed/halisaha2/900/600'
    },
    {
      id: 3,
      name: 'Lara Night Pitch',
      desc: '1 kaleci aranıyor. Takım hazır, maç 20:30.',
      location: 'Antalya / Lara',
      timeTag: 'Bugün',
      pitch: '5v5',
      pricePerHour: 1200,
      contactText: 'DM at',
      imageUrl: 'https://picsum.photos/seed/halisaha3/900/600'
    },
    {
      id: 4,
      name: 'Muratpaşa Sahil Halı Saha',
      desc: '2 kişi aranıyor. Tempo yüksek, maç hafta sonu.',
      location: 'Antalya / Muratpaşa',
      timeTag: 'Hafta Sonu',
      pitch: '8v8',
      pricePerHour: 2200,
      contactText: 'İletişim kur',
      imageUrl: 'https://picsum.photos/seed/halisaha4/900/600'
    },
    {
      id: 5,
      name: 'Dokuma Park Saha',
      desc: '1 kişi aranıyor. Orta saha, pas oyunu.',
      location: 'Antalya',
      timeTag: 'Her Zaman',
      pitch: '7v7',
      pricePerHour: 1700,
      contactText: 'WhatsApp',
      imageUrl: 'https://picsum.photos/seed/halisaha5/900/600'
    },
    {
      id: 6,
      name: 'Kale Arkası Halı Saha',
      desc: '2 kişi aranıyor. Kaleci + bir oyuncu.',
      location: 'Antalya',
      timeTag: 'Yarın',
      pitch: '6v6',
      pricePerHour: 1600,
      contactText: 'Telefon',
      imageUrl: 'https://picsum.photos/seed/halisaha6/900/600'
    }
  ];

  trackByItemId = (_: number, item: HaliSahaItem) => item.id;

  get filteredItems(): HaliSahaItem[] {
    const q = this.query.trim().toLowerCase();

    let list = this.items.filter(x => {
      const matchesQ =
        !q ||
        x.name.toLowerCase().includes(q) ||
        x.location.toLowerCase().includes(q) ||
        x.pitch.toLowerCase().includes(q) ||
        x.desc.toLowerCase().includes(q);

      const matchesTime = this.selectedTime === 'Tümü' || x.timeTag === this.selectedTime;

      return matchesQ && matchesTime;
    });

    if (this.sortBy === 'Fiyat Artan') list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (this.sortBy === 'Fiyat Azalan') list = [...list].sort((a, b) => b.pricePerHour - a.pricePerHour);

    return list;
  }

  formatPrice(n: number) {
    return new Intl.NumberFormat('tr-TR').format(n);
  }

  contact(item: HaliSahaItem) {
    alert(`${item.name}\n\n${item.contactText}\n\nKonum: ${item.location}`);
  }
}
