import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
    // mensagem
    private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }


  mensagem(str: string): void {
    this._snack.open(`${str}`, 'OK',{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration: 3000
    })
  }


  mensagemErrors(err: any): void {
    for(let i = 0; i <err.error.errors.length; i ++){
     return this.mensagem(err.error.errors[i].message);
    }

  }

  mensagemError(err: any): void {
      return this.mensagem(err.error.error);
    }

}
