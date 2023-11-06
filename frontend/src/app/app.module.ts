import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';1
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule  } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Import this to use the native date format
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AgendamentoPopupComponent } from './agendamento-popup/agendamento-popup.component';

import { CadastroClienteService } from "./cadastro-cliente/cadastro-cliente.service";
import { AgendamentoService } from "./agendamento/agendamento.service";
import { HttpClientModule } from '@angular/common/http';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    CadastroClienteComponent,
    AgendamentoComponent,
    AgendamentoPopupComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    // Add these providers for the DateAdapter and DateFormats
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    },
    {
      provide: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: CadastroClienteService
    },
    {
      provide: AgendamentoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
