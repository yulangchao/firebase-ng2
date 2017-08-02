import {Component} from '@angular/core';

import {SummaryService} from './summary.service';

import {Router} from '@angular/router';
// Import NgFor directive


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'summary',
    templateUrl: './summary.component.html'
})

export class SummaryComponent {

  // Initialize our `summaryData.text` to an empty `string`
  summaryData = {
    name: '',
    price: null,
    saleprice: null,
    number: 0,
    text: ''
  };

  private filter: string = '';
  private summarys: Array<any> = [];
  private rukus: Array<any> = [];
  private chukus: Array<any> = [];
  private arrays: Array<any> = [];
  private outcome: number = 0;
  private income: number = 0;
  constructor(private router: Router, public summaryService: SummaryService) {
    console.log('Summary constructor go!');
      if (localStorage.getItem('token')) {

          summaryService.getAllruku().subscribe((res) => {
            // Populate our `summary` array with the `response` data
            this.rukus = res;
            for (let ruku of this.rukus) {
              if (isNaN(this.arrays[ruku.name])) {
                this.arrays[ruku.name] = 0;
              }
              this.arrays[ruku.name] = this.arrays[ruku.name] + ruku.number;
              this.outcome += ruku.number * ruku.price;
            }
            summaryService.getAllchuku().subscribe((res) => {
                // Populate our `summary` array with the `response` data
                this.chukus = res;
                for (let chuku of res) {
                  if (isNaN(this.arrays[chuku.name])) {
                    this.arrays[chuku.name] = 0;
                  }
                  this.arrays[chuku.name] = this.arrays[chuku.name] - chuku.number;
                  this.income += chuku.number * chuku.price - chuku.kuaidi;
                }
                for(let i in this.arrays){
                     this.summarys.push({name:i, number : this.arrays[i]});
                }
              });
          });
      } else {
        router.navigate(['']);
      }
  }

}
