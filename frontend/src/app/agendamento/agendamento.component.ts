import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgendamentoPopupComponent } from '../agendamento-popup/agendamento-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoService } from './agendamento.service';
import { switchMap, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  filtroForm!: FormGroup;
  agendamentos: any[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private agendamentoService: AgendamentoService) { }

  ngOnInit() {
    this.filtroForm = this.fb.group({
      data: [new Date()]
    });

    const today = this.filtroForm.get('data')?.value.toISOString().split("T")[0];

    this.agendamentoService.getAgendamentos(today).subscribe(agendamentos => {
      console.log("agendamentos do dia", agendamentos)
      this.agendamentos = agendamentos;
    });
  }

  onSubmitFiltro() {
    // Lógica para lidar com a seleção da data e carregar os agendamentos correspondentes
    const selectedDate = this.filtroForm.get('data')?.value.toISOString().split("T")[0];
    console.log('Data selecionada:', selectedDate);

    this.agendamentoService.getAgendamentos(selectedDate).subscribe(agendamentos => {
      console.log("agendamentos do dia", agendamentos)
      this.agendamentos = agendamentos;
    });
  }

  inserirNovoAgendamento() {
    // Lógica para abrir o formulário de inserção ou redirecionar para uma nova rota de inserção
    console.log('Inserir novo agendamento', this.filtroForm.get('data')?.value);
    const dialogRef = this.dialog.open(AgendamentoPopupComponent, {
      width: '400px', // Defina a largura conforme necessário
      data: this.filtroForm.get('data')?.value.toISOString().split("T")[0]
    });

    // Opcional: Lógica após fechar o popup (por exemplo, atualizar dados)
    dialogRef.afterClosed().subscribe((result: Observable<any>) => {
      console.log(result);

      if (result) {
        result
          .pipe(
            switchMap(() => this.agendamentoService.getAgendamentos()),
            map((agendamentos: any) => {
              return agendamentos.map((agendamento: any) => ({
                "nome": agendamento.cliente_id,
                "hora": agendamento.data_hora_agendamento,
                "data": agendamento.data_hora_agendamento
              }))
            })
          ).subscribe((data: any[]) => {
            console.log(data);
            this.agendamentos = data;
          });
      }
    });
  }
}
