import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemService {

  private user: any;
  constructor(public http:Http) {
    if(localStorage.getItem('token')){
      this.user = JSON.parse(localStorage.getItem('token'))._id;
    }
  }

  getAll() {
      return this.http.get(`/api/item/${this.user}`).map(res => res.json());
  }

  createItem(data) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post(`/api/item/${this.user}`, JSON.stringify(data),{headers: headers}).map(res => res.json());
  }

  deleteItem(id) {

      return this.http.delete(`/api/item/${this.user}/${id}`).map(res => res.json());
  }

  getAllruku(){
    return this.http.get('/api/ruku').map(res => res.json());
  }

  getAllchuku(){
    return this.http.get('/api/chuku').map(res => res.json());
  }

  updateItem(name,data) {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      return this.http.put(`/api/item/${this.user}/${name}`,JSON.stringify(data),{headers: headers}).map(res => res.json());
  }
}
