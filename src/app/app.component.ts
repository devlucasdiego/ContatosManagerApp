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
  public contatos: Contato[] = [];
  public editContato!: Contato;
  public deleteContato!: Contato;
  title: any;

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
}
