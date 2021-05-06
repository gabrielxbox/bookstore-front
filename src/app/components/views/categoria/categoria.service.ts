import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaModule } from './categoria.module';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string;

  constructor(private http: HttpClient,
    // mensagem
    private _snack: MatSnackBar) {
    this.baseUrl = environment.baseUrl;
   }


  finAll() : Observable<CategoriaModule[]> {
    const url =`${this.baseUrl}/categorias`;
    return this.http.get<CategoriaModule[]>(url);
  }

  findByid(id : string) : Observable<CategoriaModule>{
    const url =`${this.baseUrl}/categorias/${id}`;
    return this.http.get<CategoriaModule>(url);
  }

  create(categoria: CategoriaModule): Observable<CategoriaModule> {
    const url =`${this.baseUrl}/categorias`;
    return this.http.post<CategoriaModule>(url, categoria);
  }

  delete(id: string): Observable<void> {
    const url =`${this.baseUrl}/categorias/${id}`;
    return this.http.delete<void>(url);
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
