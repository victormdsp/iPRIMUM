import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  requestEquipaments(token: string) {
    return new Promise((res, rej) => {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const url = 'https://desafio-iall.azurewebsites.net/api/Equipamentos';
      this.http.get(url, headers)
        .subscribe(req => {
          res(req);
        })
    })
  }

  requestLogin(login: string, senha: string) {
    return new Promise((res, rej) => {

      const body = JSON.stringify({
        userName: login,
        password: senha
      })

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }

      const url = 'https://desafio-iall.azurewebsites.net/api/login';
      this.http.post<string>(url, body, httpOptions)
        .subscribe(req => {
          console.log(req)
          res(req);
        })
    })
  }
}
