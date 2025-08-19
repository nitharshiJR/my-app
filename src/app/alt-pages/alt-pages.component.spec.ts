import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltPagesComponent } from './alt-pages.component';

describe('AltPagesComponent', () => {
  let component: AltPagesComponent;
  let fixture: ComponentFixture<AltPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
