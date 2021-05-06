import { CategoriaModule } from './../categoria.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delite',
  templateUrl: './categoria-delite.component.html',
  styleUrls: ['./categoria-delite.component.css']
})
export class CategoriaDeliteComponent implements OnInit {

  public categoria: CategoriaModule = {
    id: '',
    nome: '',
    descricao: ''
  };

  constructor(private sevice: CategoriaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.categoria.id = this.route.snapshot.paramMap.get('id');
    this.findByid();

  }

  findByid(): void {
     this.sevice.findByid(this.categoria.id!).subscribe((resposta) =>
     {
       this.categoria = resposta

    },
     err => {
       this.sevice.mensagemError(err);
     }

     );
  }


  delete(): void {
    this.sevice.delete(this.categoria.id).subscribe((resposta) =>
    {
      this.router.navigate(['categorias']);
      this.sevice.mensagem("categoria deletada com sucesso!");
     ;
    },
    err => {
      this.sevice.mensagemError(err);
    });
  }

  Cancelar(): void {
    this.router.navigate(['categorias']);
  }

}
