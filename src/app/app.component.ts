import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    /*Array para receber os dados pos-salvos*/
    tasks: Task[] = [];


  /*Recebe dados do formulario*/
    form: FormGroup = new FormGroup({
        description: new FormControl('', [Validators.required, Validators.minLength(15)]),
        name: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
     /*instancia do serviço no construtor do componente
       para consumir o metodo de persistencia*/
    constructor(
      private taskService: TaskService
    ){}
    /**/
    ngOnInit(): void {
        this.listar();
    }

    submit(){
      /*Seta os dados no formulario no objeto tarefa*/
      const task: Task = {...this.form.value}
      /*passa o objeto carregado para a persistencia retornando
       um subscribe do observable*/
      this.taskService
          .salvar(task)
          .subscribe(savedTask => {
            /*carrega o array*/
            this.tasks.push(savedTask);
            this.form.reset();
          })
        }

        listar(){
            /*Lista os registros ao abrir a pagina*/
           this.taskService.listar().subscribe(tasksList => {
            this.tasks = tasksList
          });
        }

      delete(task: Task){
          /*deleta por id*/
          this.taskService.deletar(task.id).subscribe({
            next: (Response) => this.listar()
          })
      }

      marcaConcluido(task: Task){
          this.taskService.marcarComoConcluido(task.id).subscribe({
            next: (taskAtualizada) => {
                task.done = taskAtualizada.done;
                task.doneDate = taskAtualizada.doneDate;
            }
          });
      }

}
