import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModule } from '../categoria.module';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  public categoria: CategoriaModule = {
    nome: '',
    descricao: ''
  };

  constructor(private service: CategoriaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.categoria.id = this.route.snapshot.paramMap.get('id');
    this.findByid();
  }

  findByid(): void {
   this.service.findByid(this.categoria.id).subscribe((resposta) => {
     this.categoria = resposta;
   },
    (error) => {
      this.service.mensagemError(error);

    });
  }

  aualizar(): void  {
    this.service.update(this.categoria).subscribe((resposta) => {
     this.router.navigate(['categorias']);
     this.service.mensagem('categoria atualizada com sucesso');
    },
    (error) => {
      this.service.mensagem("validar se todos os campos estão preenchido corretamente");
    });
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

}
