import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5ListsComponent } from './top5-lists.component';

describe('Top5ListsComponent', () => {
  let component: Top5ListsComponent;
  let fixture: ComponentFixture<Top5ListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top5ListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
