import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctComponent } from './acct.component';

describe('AcctComponent', () => {
  let component: AcctComponent;
  let fixture: ComponentFixture<AcctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
