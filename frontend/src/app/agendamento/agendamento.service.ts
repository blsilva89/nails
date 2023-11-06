import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:3000/api/agendamentos'; // Substitua pela URL do seu servidor back-end

  constructor(private http: HttpClient) { }

  getAgendamentos(dataFiltro?: string): Observable<any[]> {
    let params = new HttpParams();

    if (dataFiltro) {
      params = params.set('dataFiltro', dataFiltro);
    }

    const response = this.http.get<any[]>(this.apiUrl, { params });
    return response.pipe(
      map((agendamentos: any) => {
        return agendamentos.map((agendamento: any) => ({
          "nome": agendamento.Cliente.nome,
          "data": agendamento.data_agendamento,
          "hora": agendamento.hora_agendamento
        }))
      }));
  }

  cadastrarAgendamento(agendamento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, agendamento);
  }
}
