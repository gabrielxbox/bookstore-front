import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from '../livro.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

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

  create(): void {

    this.service.create(this.livro, this.id_categoria).subscribe((resposta) => {
    this.router.navigate([`categorias/${this.id_categoria}/livros`]);
    this.service.mensagem("livro cadastrado com sucesso");
    }, (error) => {this.service.mensagemError(error)});

  }

  Cancel(): void {
    this.router.navigate([`categorias/${this.id_categoria}/livros`]);
  }
}
