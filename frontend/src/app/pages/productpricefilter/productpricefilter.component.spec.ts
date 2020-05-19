import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpricefilterComponent } from './productpricefilter.component';

describe('ProductpricefilterComponent', () => {
  let component: ProductpricefilterComponent;
  let fixture: ComponentFixture<ProductpricefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpricefilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpricefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
