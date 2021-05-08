import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  public titulo = new FormControl('', [Validators.minLength(3)]);

  public nome_autor = new FormControl('', [Validators.minLength(3)]);

  public texto = new FormControl('', [Validators.minLength(3)]);

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

delete(): void {
  this.service.delete(this.livro.id).subscribe((resposta) => {
    this.router.navigate([`categorias/${this.id_categoria}/livros`]);
    this.service.mensagem("livro deletado com sucesso ");
  },
  (error)=>
    {
      this.router.navigate([`categorias/${this.id_categoria}/livros`]);
      this.service.mensagemError(error)
    }
  );
}

Cancel(): void {
  this.router.navigate([`categorias/${this.id_categoria}/livros`]);
}
}
