import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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

  getMensagem () {
    if(this.titulo.invalid){
     return " o campo TITULO deve conter entre 3 e 100 caracteres";
    }
    if(this.nome_autor.invalid){
      return " o campo NOME deve conter entre 3 e 100 caracteres";
    }
    if(this.texto.invalid){
        return " o campo TEXTO deve conter entre 3 e 2,00000 caracteres";
    }
    return false;
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

  Cancel(): void {
    this.router.navigate([`categorias/${this.id_categoria}/livros`]);
  }
}
