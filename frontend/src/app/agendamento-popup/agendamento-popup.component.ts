import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroClienteService } from '../cadastro-cliente/cadastro-cliente.service';
import { AgendamentoService } from '../agendamento/agendamento.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agendamento-popup',
  templateUrl: './agendamento-popup.component.html',
  styleUrls: ['./agendamento-popup.component.css']
})
export class AgendamentoPopupComponent {
  agendamentoForm!: FormGroup;
  clientes!: any[]; // Substitua com a lista real de clientes
  cadastro$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private clienteService: CadastroClienteService,
    private agendamentoService: AgendamentoService,
    public dialogRef: MatDialogRef<AgendamentoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {

    console.log(this.data);
    

    this.agendamentoForm = this.fb.group({
      cliente: [null, Validators.required],
      data: [this.data, Validators.required],
      hora: [null, Validators.required]
    });

    // Simule uma lista de clientes
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    })
  }

  submitForm() {
    // Lógica para lidar com a submissão do formulário
    if (this.agendamentoForm.valid) {
      // Aqui você pode enviar os dados para o seu backend, por exemplo.
      console.log('Formulário válido:', this.agendamentoForm.value);

      const dataAgendamento = this.agendamentoForm.value.data.toISOString().split("T")[0];
      const horaAgendamento = this.agendamentoForm.value.hora;
      this.cadastro$ = this.agendamentoService.cadastrarAgendamento({
        "cliente_id": this.agendamentoForm.value.cliente.id,
        "data_agendamento": dataAgendamento,
        "hora_agendamento": horaAgendamento
      });
      this.dialogRef.close(this.cadastro$);
    }
  }
}
