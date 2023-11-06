import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoPopupComponent } from './agendamento-popup.component';

describe('AgendamentoPopupComponent', () => {
  let component: AgendamentoPopupComponent;
  let fixture: ComponentFixture<AgendamentoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoPopupComponent]
    });
    fixture = TestBed.createComponent(AgendamentoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
