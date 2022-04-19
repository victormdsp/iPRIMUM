import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  /* --------------------------------GET--------------------------------- */

  //Busca todos os equipamentos referente ao usuário
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

  //Busca um equipamento pelo ID
  requestEquipamentById(token: string, id: string) {
    return new Promise((res, rej) => {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const url = `https://desafio-iall.azurewebsites.net/api/Equipamentos/${id}`
      this.http.get(url, headers)
        .subscribe(req => {
          res(req);
        })
    })
  }

  /* --------------------------------POST--------------------------------- */

  //Retorna o login
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
          res(req);
        })
    })
  }

  //Enviar respostas de equipamentos
  sendAnswer(data, token: string) {
    return new Promise((res, rej) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }

      const url = 'https://desafio-iall.azurewebsites.net/api/Equipamentos';
      this.http.post(url, data, httpOptions)
        .subscribe(req => {
          res(req);
        })
        .unsubscribe()
    }).catch(err => {
      console.log(err);
    })
  }
}
