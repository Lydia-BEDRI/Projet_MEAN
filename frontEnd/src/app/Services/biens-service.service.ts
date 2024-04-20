import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Bien, Biens, PaginationParams } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class BiensServiceService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private apiService: ApiService,private httpClient:HttpClient) {}

   // Getting products from the API
   getBiens = (
    url: string,
    params: PaginationParams
  ): Observable<Biens> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  // Adding a product via the API
  addBien = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a product via the API
  editBien = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a product via the API
  deleteBien = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };

  searchBiens(criteria: any): Observable<any> {
    return this.httpClient.post(`${this.urlBase}/biens/search`, criteria);
  }

  getBienById(id: string): Observable<Bien> {
    const url = `http://localhost:8888/biens/${id}`; // URL de l'API pour récupérer un bien par ID
    return this.httpClient.get<Bien>(url);
  }
}
