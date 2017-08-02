import {Injectable} from '@angular/core';
import { URLSearchParams, Http, Headers, RequestOptions } from '@angular/http';
import {Jsonp} from '@angular/http';

// `Injectable` is usually used with `Dart` metadata
// generation; it has no special meaning within `TypeScript`
// This makes sure `TypeScript` emits the needed metadata
// Reference : http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
@Injectable()
export class StockService {
  // The `public` keyword denotes that the constructor parameter will
  // be retained as a field.
  // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#336-members
  // Add `Http` type annotation to the `http` function argument
  // Type annotations in TypeScript are used to record the
  // intended contract of the function or variable.
  // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3-types
  // Here we intend the constructor function to be called with the
  // `Http` parameter
  private user: any;
  constructor(public http:Http, public jsonp:Jsonp) {
    if(localStorage.getItem('token')){
      this.user = JSON.parse(localStorage.getItem('token'))._id;
    }
  }

  getStockById(id){
    var params = new URLSearchParams();
    params.append('code', 'cn_' + id);
    params.append('start', '20170522');
    params.append('end', '20170526');
    params.append('stat', '1');
    params.append('order', 'D');
    params.append('period', 'd');
    params.append('callback', 'JSONP_CALLBACK');
    params.append('rt', 'jsonp');
    return this.jsonp.get('http://q.stock.sohu.com/hisHq', {params: params}).map(res => res.json());
  }


}
