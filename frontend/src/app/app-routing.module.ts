import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'agendamentos', component: AgendamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
