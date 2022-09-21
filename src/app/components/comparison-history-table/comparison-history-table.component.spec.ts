import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonHistoryTableComponent } from './comparison-history-table.component';

describe('ComparisonHistoryTableComponent', () => {
  let component: ComparisonHistoryTableComponent;
  let fixture: ComponentFixture<ComparisonHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
