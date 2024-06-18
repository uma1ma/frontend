import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/createItem', item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl + '/updateItem'}/${id}`, item);
  }

  getItem(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/items');
  }
  deleteItem(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + '/deleteItem'}/${id}`);
  }
}
