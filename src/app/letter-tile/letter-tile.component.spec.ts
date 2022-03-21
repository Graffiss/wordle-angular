import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTileComponent } from './letter-tile.component';

describe('LetterTileComponent', () => {
  let component: LetterTileComponent;
  let fixture: ComponentFixture<LetterTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
