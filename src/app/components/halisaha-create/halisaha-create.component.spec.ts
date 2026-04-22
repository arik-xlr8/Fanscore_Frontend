import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalisahaCreateComponent } from './halisaha-create.component';

describe('HalisahaCreateComponent', () => {
  let component: HalisahaCreateComponent;
  let fixture: ComponentFixture<HalisahaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalisahaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalisahaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
