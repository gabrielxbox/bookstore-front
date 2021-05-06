import { CategoriaService } from '../categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaModule } from '../categoria.module';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  public categorias: Array<CategoriaModule> = [];

  public  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros' ,'acoes'];

  constructor(private service: CategoriaService,
              private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.finAll().subscribe( resposta => {
      console.log(resposta)
        this.categorias  = resposta
      });
  }

  navegarParaCategoriaCreate(): void {
    this.router.navigate(["categorias/create"]);

  }



}
