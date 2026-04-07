import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPanelComponent } from './rating-panel.component';

describe('RatingPanelComponent', () => {
  let component: RatingPanelComponent;
  let fixture: ComponentFixture<RatingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
