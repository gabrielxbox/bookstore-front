import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  private id_categoria: string = null;

  public livro: Livro = {
    titulo: null,
    nome_autor: null,
    texto: null
  }

constructor(private service: LivroService,
           private route: ActivatedRoute,
            private router: Router) { }

ngOnInit(): void {
  this.id_categoria = this.route.snapshot.paramMap.get('id_cat');
  this.livro.id = this.route.snapshot.paramMap.get('id');
  this.findById();
}

findById(): void {

  this.service.findById(this.livro.id).subscribe((resposta) => {

    this.livro = resposta;

  }, (error) => {this.service.mensagemError("error a criar o novo livro")});

}

ubdate(): void {
  this.service.update(this.livro).subscribe((resposta) => {
    this.livro = resposta;
    this.service.mensagem("livro atualizado com sucesso ");
  },
  (error)=>
    {this.service.mensagemError(error)}
  );
}

cancelar(): void {
  this.router.navigate([`categorias/${this.id_categoria}/livros`]);
}

}
