import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

// `Injectable` is usually used with `Dart` metadata
// generation; it has no special meaning within `TypeScript`
// This makes sure `TypeScript` emits the needed metadata
// Reference : http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
@Injectable()
export class SummaryService {
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
  constructor(public http:Http) {
    if(localStorage.getItem('token')){
      this.user = JSON.parse(localStorage.getItem('token'))._id;
    }
  }

  getAllruku(){
    return this.http.get(`/api/ruku/${this.user}`).map(res => res.json());
  }

  getAllchuku(){
    return this.http.get(`/api/chuku/${this.user}`).map(res => res.json());
  }

}
