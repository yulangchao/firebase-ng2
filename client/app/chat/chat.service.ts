import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ChatService {
  items: FirebaseListObservable<any[]>;
  chats: any;
  users: any;
  constructor(public db: AngularFireDatabase) {
    this.chats = this.db.database.ref().child("chat");
    this.users = this.db.database.ref().child("users");
  }

  getData(room) {
    this.items = this.db.list('chat/' + room);
    return this.items;
  }

  getUser() {
    return this.db.list('users');
  }
}
