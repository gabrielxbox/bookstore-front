import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  public  displayedColumns: string[] = ['id', 'titulo', 'livros' ,'acoes'];

  public livros: Livro[] = [];

  private id_categoria: string = "";

  constructor(private service: LivroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_categoria = this.route.snapshot.paramMap.get('id_cat');
    this.findAllByCategoria();
  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_categoria).subscribe((resposta) => {
      this.livros = resposta;
    }, (error)=> this.service.mensagemError(error)
    );
  }

}
