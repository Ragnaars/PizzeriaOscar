import { Injectable, OnInit } from '@angular/core';
import { ProductoConId, Producto, ProductoParcial } from "../interfaces/producto";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {



  public stock: number = 0;
  private Page = 1;
  private URL_PRODUCTOS = 'https://tortoiseshell-cooperative-taste.glitch.me/producto';
  private comLista = new BehaviorSubject<Array<ProductoConId>>([]);
  //CREAR OBSERVADOR
  public listaProducto$ = this.comLista.asObservable();
  public area: any = {};

  constructor(
    private http: HttpClient,
  ) { }

  public obtenerPrimerosProductos() {
    this.http.get<ProductoConId[]>(`${this.URL_PRODUCTOS}?_page=1`).pipe(
      delay(2000)
    )
      .subscribe(resp => {
        this.Page = this.Page + 1;
        this.comLista.next(resp);
      })
  }

  public obtenerPrimerosProductos1() {
    this.http.get<Array<ProductoConId>>(`${this.URL_PRODUCTOS}}`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.Page = this.Page + 1;
        this.comLista.next(resultado);
      });
  }


  public obtenerMasElementos() {
    this.http.get<Array<ProductoConId>>(`${this.URL_PRODUCTOS}?_page=${this.Page}`).pipe(
      delay(2000)
    ).subscribe(resp => {
      this.Page = this.Page + 1;
      this.comLista.next(this.comLista.getValue().concat(resp));
    })
  }

  public guardarProducto(producto: Producto): Observable<ProductoConId> {
    // return this.http.post<ProductoConId>(this.UrlApi, producto, {
    //   headers : {
    //     'Content-Type':'application/json; charset=utf-8'
    //   }
    // })
    return this.http.post<ProductoConId>(this.URL_PRODUCTOS, producto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public getProducto(id: number): Observable<ProductoConId | null> {
    // const path = this.URL_PRODUCTOS + id;
    return this.http.get<ProductoConId | null>(`${this.URL_PRODUCTOS}/${id}`)
  }

  public eliminarPublicacion(id: number): Observable<any> {
    // const path = this.URL_PRODUCTOS + id;
    // return this.http.delete(path)

    return this.http.delete(`${this.URL_PRODUCTOS}/${id}`);
  }

  public actualizarPublicacion(producto: Producto, id: number) {
    const path = this.URL_PRODUCTOS + id;
    return this.http.patch<Producto>(path, producto);

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
