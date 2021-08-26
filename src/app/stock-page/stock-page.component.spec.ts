import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPageComponent } from './stock-page.component';

describe('StockPageComponent', () => {
  let component: StockPageComponent;
  let fixture: ComponentFixture<StockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should run ngoninit", () => {
    expect(component.ngOnInit).toHaveBeenCalled();
  })

  it("should test the getAllMethod", () => {
    //spy basically watches component to see if getAllSTocks is ever called
    let spy = spyOn(component, "getAllStocks");
    //This calls getAllSTocks
    component.getAllStocks();
    //this is a test that returns true or false if the spy ever caught getallstocks being called
    expect(spy).toHaveBeenCalled();
  })
});
