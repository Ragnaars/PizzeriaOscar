export interface Producto {
    imagen?: string,
    nombre: string,
    precio: number,
    desc: string
}


export interface ProductoConId extends Producto {
    cantidad: any;
    id: number;

}
export interface ProductoParcial extends Partial<Producto> {

}
