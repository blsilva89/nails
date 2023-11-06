import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastroClienteService } from '../cadastro-cliente/cadastro-cliente.service';
import { CadastroClienteComponent } from '../cadastro-cliente/cadastro-cliente.component';
import { Observable, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  // clientes$!: Observable<any[]>;
  displayedColumns: string[] = ['nome', 'telefone', 'dataNascimento', 'endereco'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog, private clienteService: CadastroClienteService) { }

  obterClientes() {
    return this.clienteService.getClientes().pipe(
      map(value => {
        console.log(value);

        return value.map((element) => (
          {
            "nome": element.nome,
            "telefone": element.telefone,
            "dataNascimento": element.data_nascimento.split("T")[0],
            "endereco": `${element.rua}, ${element.cidade} - ${element.estado}, ${element.cep}`,

          }));


      }))
  }

  ngOnInit() {

    this.obterClientes().subscribe(clientes => {
      this.dataSource.data = clientes;
    });
  }

  abrirPopUp() {
    console.log('Inserir novo agendamento');
    const dialogRef = this.dialog.open(CadastroClienteComponent);

    // Opcional: Lógica após fechar o popup (por exemplo, atualizar dados)
    dialogRef.afterClosed().subscribe(() => {
      console.log('O popup foi fechado');

      this.obterClientes().subscribe(clientes => {
        this.dataSource.data = clientes;
      });

      // this.clientes$.push({
      //   "nome": cliente.nome,
      //   "telefone": cliente.telefone,
      //   "dataNascimento": cliente.dataNascimento,
      //   "rua": cliente.endereco,
      //   "cidade": cliente.cidade,
      //   "estado": cliente.estado,
      //   "cep": cliente.cep
      // });
    });
  }
}
