import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  npizzas:number = 8;
  countrycode:string="56";
  whastappnumber:string="954890716";
  url:string="http://wa.me/"+this.countrycode+this.whastappnumber+"?text='Hola, quisiera hacer un pedido de "+this.npizzas+" pizzas'. Este pedido fue realizado desde ionic";
  constructor() {}

}
