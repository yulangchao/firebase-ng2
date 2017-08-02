import {Component} from '@angular/core';
import {ItemService} from './item.service';
import {Router} from '@angular/router';

import { ToastComponent } from '../shared/toast/toast.component';
// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'item',
    // Let Angular 2 know about `Http` and `ItemService`
	  templateUrl: './item.component.html'
})

export class ItemComponent {

  // Initialize our `itemData.text` to an empty `string`
  itemData = {
    name: '',
    price: 0,
    saleprice: 0,
    number: 0,
    text: ''
  };

  private filter: string = '';
  private shows: number = 5;
  private items: Array<ItemComponent> = [];
  private rukus: Array<any> = [];
  private chukus: Array<any> = [];
  private arrays: Array<number> = [];
  private clicked: boolean = false;
  private isLoading: boolean = true;
  constructor(private router: Router, public itemService: ItemService, public toast: ToastComponent) {
    console.log('Item constructor go!');
      if (localStorage.getItem('token')) {

          this.getAll();
      } else {

        router.navigate(['']);
      }
  }



  getAll(){
          this.itemService.getAll().subscribe((res) => {
                      this.items = res;
                      this.isLoading = false;
                      this.itemData.text = '';
                      this.itemData.name = '';
                      this.itemData.price = 0;
                      this.itemData.number = 0;
                      this.itemData.saleprice = 0;
           });
  }


  createItem() {
      if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.itemService.createItem(this.itemData)
        .subscribe(
          res => {
            // Populate our `item` array with the `response` data
            this.items = res;
            this.toast.setMessage('Product is added successfully.', 'success');
            // Reset `item` input
            this.itemData.text = '';
            this.itemData.name = '';
            this.itemData.price = 0;
            this.itemData.number = 0;
            this.itemData.saleprice = 0;
          },
          error => this.toast.setMessage(error._body+'', 'danger')
        );
      }
  }

  deleteItem(id) {
      if (JSON.parse(localStorage.getItem('token')).role === "admin") {

        this.itemService.deleteItem(id)
          .subscribe(
            res => {

              // Populate our `item` array with the `response` data
              this.items = res;
              this.toast.setMessage('Product is deleted successfully.', 'success');
            },
            error => console.log(error._body)
          );
      }
  }

  updateItem(item) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      console.log(this.itemData);
      this.itemService.updateItem(item._id,this.itemData)
        .subscribe((res) => {

             this.items[this.items.indexOf(item)] = res;
             this.toast.setMessage('Product is edited successfully.', 'success');
        });
    }
  }

  updateItems(){
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.itemService.getAllruku()
        .subscribe((res) => {

          // Populate our `item` array with the `response` data
          this.rukus = res;
          for (let ruku of this.rukus) {
            console.log(ruku.number);
            if (isNaN(this.arrays[ruku.name])) {
              this.arrays[ruku.name] = 0;
            }
            this.arrays[ruku.name] = this.arrays[ruku.name] + ruku.number
          }
          console.log(this.arrays);
          this.itemService.getAllchuku()
            .subscribe((res) => {

              // Populate our `item` array with the `response` data
              this.chukus = res;
              console.log(this.chukus);
              for (let chuku of this.chukus) {
                console.log(chuku.number);
                if (isNaN(this.arrays[chuku.name])) {
                  this.arrays[chuku.name] = 0;
                }
                this.arrays[chuku.name] = this.arrays[chuku.name] - chuku.number
              }
              console.log(this.arrays);
              for (let array in this.arrays) {
                console.log(array);
                console.log(this.arrays[array]);
                this.itemService.updateItem(array, {number: this.arrays[array]})
                  .subscribe((res) => {

                  });
              }
              this.clicked = true;
              this.arrays = [];

            });

        });
    }
  }

  isadmin(){
    if(localStorage.getItem('token')){
    return (JSON.parse(localStorage.getItem('token')).role === "admin");
    }else{
      return false;
    }
  }

  updateForm(item){
       this.itemData.text = item.text;
       this.itemData.name = item.name;
       this.itemData.price = item.price;
       this.itemData.saleprice = item.saleprice;
  }
}
