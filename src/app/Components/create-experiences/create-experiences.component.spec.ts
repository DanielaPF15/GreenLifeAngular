import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExperiencesComponent } from './create-experiences.component';

describe('CreateExperiencesComponent', () => {
  let component: CreateExperiencesComponent;
  let fixture: ComponentFixture<CreateExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
