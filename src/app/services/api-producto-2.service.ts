import { Injectable, OnInit } from '@angular/core';
import { Producto2ConId, Producto2, Producto2Parcial } from "../interfaces/producto2";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { delay, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiProducto2Service {

  public stock: number = 0;
  private Page = 1;
  private URL_PRODUCTOS = 'https://adaptable-endurable-quit.glitch.me/producto2';
  private comLista = new BehaviorSubject<Array<Producto2ConId>>([]);
  //CREAR OBSERVADOR
  public listaProducto$ = this.comLista.asObservable();


  constructor(
    private http: HttpClient,
  ) { }


  public obtenerPrimerosProductos() {
    this.http.get<Producto2ConId[]>(`${this.URL_PRODUCTOS}?_page=1`).pipe(
      delay(2000)
    )
      .subscribe(resp => {
        this.Page = this.Page + 1;
        this.comLista.next(resp);
        console.log(resp);
      })
  }

  public obtenerPrimerosProductos12() {
    this.http.get('../../assets/db.json').pipe(
      delay(2000)
    )
      .subscribe(resp => {
        this.Page = this.Page + 1;
        console.log(Object(resp).producto)
        this.comLista.next(Object(resp).producto);
      })
  }

  public obtenerPrimerosProductos1() {
    this.http.get<Array<Producto2ConId>>(`${this.URL_PRODUCTOS}}`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.Page = this.Page + 1;
        this.comLista.next(resultado);
      });
  }


  public obtenerMasElementos() {
    this.http.get<Array<Producto2ConId>>(`${this.URL_PRODUCTOS}?_page=${this.Page}`).pipe(
      delay(2000)
    ).subscribe(resp => {
      this.Page = this.Page + 1;
      this.comLista.next(this.comLista.getValue().concat(resp));
    })
  }

  public guardarProducto(producto: Producto2): Observable<Producto2ConId> {
    // return this.http.post<ProductoConId>(this.UrlApi, producto, {
    //   headers : {
    //     'Content-Type':'application/json; charset=utf-8'
    //   }
    // })
    return this.http.post<Producto2ConId>(this.URL_PRODUCTOS, producto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public getProducto(id: number): Observable<Producto2ConId | null> {
    // const path = this.URL_PRODUCTOS + id;
    return this.http.get<Producto2ConId | null>(`${this.URL_PRODUCTOS}/${id}`)
  }

  public eliminarPublicacion(id: number): Observable<any> {
    // const path = this.URL_PRODUCTOS + id;
    // return this.http.delete(path)

    return this.http.delete(`${this.URL_PRODUCTOS}/${id}`);
  }

  public actualizarPublicacion(producto: Producto2, id: number) {
    const path = this.URL_PRODUCTOS + id;
    return this.http.patch<Producto2>(path, producto);

    // return this.http.patch(`${this.URL_PRODUCTOS}/${id}`,producto,{
    //   headers: {
    //     'Content-Type':'application/json; charset=utf-8'
    //   }
    // });
  }

  // public modificarPorID(id: number, payload: ProductoParcial): Observable<any>{
  //   return this.http.patch(`${this.Ur}/${id}`,payload,{
  //     headers: {
  //       'Content-Type':'application/json; charset=utf-8'
  //     }
  //   });
  // }


}
