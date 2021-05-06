import {  Router } from '@angular/router';
import { CategoriaModule } from './../categoria.module';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

 public categoria: CategoriaModule = {
    nome: '',
    descricao: ''
  };

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.categoria).subscribe((reposta) => {
      this.router.navigate(["categorias"]);
      this.service.mensagem("Categoria Criada Com Sucesso!");
    }, err => {
        this.service.mensagemErrors(err);

    })


    this.limparCategoria();
  }

  limparCategoria(): void {
    this.categoria.nome  = null;
    this.categoria.descricao  = null;
  }

  Cancel() : void {
    this.router.navigate(['categorias']);
  }

}
