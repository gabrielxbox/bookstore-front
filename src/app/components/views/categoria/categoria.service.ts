import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaModule } from './categoria.module';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }


  finAll() : Observable<CategoriaModule[]> {
    const url =`${this.baseUrl}/categorias`;
    return this.http.get<CategoriaModule[]>(url);
  }

}
