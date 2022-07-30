import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFileModalComponent } from './add-new-file-modal.component';

describe('AddNewFileModalComponent', () => {
  let component: AddNewFileModalComponent;
  let fixture: ComponentFixture<AddNewFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
