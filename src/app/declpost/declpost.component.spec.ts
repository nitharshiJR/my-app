import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclpostComponent } from './declpost.component';

describe('DeclpostComponent', () => {
  let component: DeclpostComponent;
  let fixture: ComponentFixture<DeclpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
