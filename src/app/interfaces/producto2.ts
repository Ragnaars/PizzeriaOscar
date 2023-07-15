export interface Producto2 {
    imagen?: string,
    nombre: string,
    precio: number,
    desc: string
}


export interface Producto2ConId extends Producto2 {
    cantidad: any;
    id: number;

}
export interface Producto2Parcial extends Partial<Producto2> {

}
