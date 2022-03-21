import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsGridComponent } from './words-grid.component';

describe('WordsGridComponent', () => {
  let component: WordsGridComponent;
  let fixture: ComponentFixture<WordsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
