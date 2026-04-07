import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingService } from '../../services/rating.service';
import {
  CreateRatingRequest,
  RatingPeriodType,
  VoteAvailability
} from '../../../models/rating';

@Component({
  selector: 'app-rating-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-panel.component.html',
  styleUrl: './rating-panel.component.css'
})
export class RatingPanelComponent implements OnInit, OnChanges {
  private ratingService = inject(RatingService);

  @Input({ required: true }) playerId!: number;

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  periods: { key: RatingPeriodType; label: string }[] = [
    { key: 'daily', label: 'Günlük' },
    { key: 'weekly', label: 'Haftalık' },
    { key: 'monthly', label: 'Aylık' },
    { key: '3months', label: '3 Ay' },
    { key: '1year', label: '1 Yıl' }
  ];

  selectedPeriod: RatingPeriodType = '3months';
  ratingValue: number | null = null;
  comment = '';

  canVoteInfo: VoteAvailability | null = null;

  isCheckingAvailability = false;
  isSubmitting = false;

  error = '';
  successMessage = '';

  ngOnInit(): void {
    if (this.playerId > 0) {
      this.checkAvailability();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerId'] && !changes['playerId'].firstChange) {
      this.resetMessages();
      if (this.playerId > 0) {
        this.checkAvailability();
      }
    }
  }

  onPeriodChange(period: RatingPeriodType): void {
    if (this.selectedPeriod === period) return;

    this.selectedPeriod = period;
    this.resetMessages();
    this.checkAvailability();
  }

  checkAvailability(): void {
    if (!this.playerId || this.playerId <= 0) {
      this.error = 'Geçerli bir oyuncu bulunamadı.';
      return;
    }

    this.isCheckingAvailability = true;
    this.error = '';
    this.successMessage = '';
    this.canVoteInfo = null;

    this.ratingService.checkCanVote(this.playerId, this.selectedPeriod).subscribe({
      next: (result: VoteAvailability) => {
        this.canVoteInfo = result;
        this.isCheckingAvailability = false;
      },
      error: (err) => {
        console.error('Oy kullanılabilirlik kontrolü başarısız:', err);
        this.error = err?.error?.message || 'Oy hakkı kontrol edilemedi.';
        this.isCheckingAvailability = false;
      }
    });
  }

  submitVote(): void {
    this.resetMessages();

    if (!this.playerId || this.playerId <= 0) {
      this.error = 'Geçerli bir oyuncu bulunamadı.';
      return;
    }

    if (this.ratingValue == null || Number.isNaN(this.ratingValue)) {
      this.error = 'Lütfen bir değer gir.';
      return;
    }

    if (this.ratingValue < 0 || this.ratingValue > 100) {
      this.error = 'Değer 0 ile 100 arasında olmalı.';
      return;
    }

    if (this.canVoteInfo && !this.canVoteInfo.canVote) {
      this.error = this.canVoteInfo.message || 'Bu zaman aralığı için şu an oy veremezsiniz.';
      return;
    }

    const payload: CreateRatingRequest = {
      playerId: this.playerId,
      periodType: this.selectedPeriod,
      ratingValue: this.ratingValue,
      comment: this.comment.trim() ? this.comment.trim() : null
    };

    this.isSubmitting = true;

    this.ratingService.createRating(payload).subscribe({
      next: () => {
        this.successMessage = 'Oyun başarıyla kaydedildi.';
        this.isSubmitting = false;

        this.checkAvailability();
        this.submitted.emit();

        this.ratingValue = null;
        this.comment = '';
      },
      error: (err) => {
        console.error('Oy gönderilemedi:', err);
        this.error = err?.error?.message || 'Oy gönderilemedi.';
        this.isSubmitting = false;
      }
    });
  }

  closePanel(): void {
    this.closed.emit();
  }

  clampRating(): void {
    if (this.ratingValue == null) return;

    if (this.ratingValue < 0) this.ratingValue = 0;
    if (this.ratingValue > 100) this.ratingValue = 100;

    this.ratingValue = Math.round(this.ratingValue * 10) / 10;
  }

  get canSubmit(): boolean {
    if (this.isSubmitting || this.isCheckingAvailability) return false;
    if (!this.playerId || this.playerId <= 0) return false;
    if (this.ratingValue == null || Number.isNaN(this.ratingValue)) return false;
    if (this.ratingValue < 0 || this.ratingValue > 100) return false;
    if (this.canVoteInfo && !this.canVoteInfo.canVote) return false;

    return true;
  }

  get availabilityMessage(): string {
    if (this.isCheckingAvailability) {
      return 'Oy hakkın kontrol ediliyor...';
    }

    if (this.error) {
      return this.error;
    }

    if (this.successMessage) {
      return this.successMessage;
    }

    if (this.canVoteInfo?.message) {
      return this.canVoteInfo.message;
    }

    return 'Bir zaman aralığı seçip oy verebilirsin.';
  }

  get nextAvailableText(): string {
    if (!this.canVoteInfo?.nextAvailableAt) return '';

    const date = new Date(this.canVoteInfo.nextAvailableAt);

    return `Tekrar oy verebileceğin zaman: ${date.toLocaleString('tr-TR')}`;
  }

  private resetMessages(): void {
    this.error = '';
    this.successMessage = '';
  }
}
