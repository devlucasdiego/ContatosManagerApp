import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from './contato.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  public contatos: Contato[];
  public editContato: Contato;
  public deleteContato: Contato;

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.getContatos();
  }

  public getContatos(): void {
    this.contatoService.getContatos().subscribe(
      (response: Contato[]) => {
        this.contatos = response;
        console.log(this.contatos);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddContato(addForm: NgForm): void {
    document.getElementById('add-contato-form').click();
    this.contatoService.addContato(addForm.value).subscribe(
      (response: Contato) => {
        console.log(response);
        this.getContatos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateContato(contato: Contato): void {
    this.contatoService.updateContato(contato).subscribe(
      (response: Contato) => {
        console.log(response);
        this.getContatos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteContato(contatoId: number): void {
    this.contatoService.deleteContato(contatoId).subscribe(
      (response: void) => {
        console.log(response);
        this.getContatos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchContatos(key: string): void {
    console.log(key);
    const results: Contato[] = [];
    for (const contato of this.contatos) {
      if (
        contato.nome.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        contato.perfil.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        contato.siglaComarca.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        contato.nomeComarca.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        contato.circuito.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        contato.numero.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(contato);
      }
    }
    this.contatos = results;
    if (results.length === 0 || !key) {
      this.getContatos();
    }
  }

  public onOpenModal(contato: Contato, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addContatoModal');
    }
    if (mode === 'edit') {
      this.editContato = contato;
      button.setAttribute('data-target', '#updateContatoModal');
    }
    if (mode === 'delete') {
      this.deleteContato = contato;
      button.setAttribute('data-target', '#deleteContatoModal');
    }
    container.appendChild(button);
    button.click();
  }
}
