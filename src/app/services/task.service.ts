import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /*endereço da api externa */
  apiUrl = 'http://localhost:8080/tech-api/task'

  /*inicia o httpClient no construtor para injeção de dependencia*/
  constructor(
    private http: HttpClient
  ) { }
  /*Metodo para fazer a persistencia de dados na base usando o Observable*/
  salvar(task: Task) : Observable<Task>{
      /*fazendo um post para api externa*/
     return this.http.post<Task>(this.apiUrl, task);
  }

  /*Metodo para listar as tarefas da base de dados*/
  listar() : Observable<Task[]>{
    /*fazendo um get para api externa   */
    return this.http.get<Task[]>(this.apiUrl);
  }

  /*metodo para deletar um registro na base de dados*/
  deletar(id: number) : Observable<void> {
    const urlDel = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlDel);
  }

  marcarComoConcluido(id: number): Observable<Task>{
    const urlUpt = `${this.apiUrl}/${id}/done`;
    return this.http.patch<Task>(urlUpt, {});
  }

}
