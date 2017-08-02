import {Component} from '@angular/core';

import {StockService} from './stock.service';

import {Router} from '@angular/router';
// Import NgFor directive


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'stock',
    templateUrl: './stock.component.html'
})

export class StockComponent {

  // Initialize our `stockData.text` to an empty `string`
  stockData = {
    name: '',
    price: null,
    saleprice: null,
    number: 0,
    text: ''
  };
  private id: string;
  private stocks: Array<any> = [];

  constructor(private router: Router, public stockService: StockService) {
    console.log('Stock constructor go!');
      if (localStorage.getItem('token')) {

      } else {
        router.navigate(['']);
      }
  }

  submit(){
          this.stockService.getStockById(this.id).subscribe((res) => {

            this.stocks = res[0].hq;
          console.log(this.stocks);
          });
  }

}
