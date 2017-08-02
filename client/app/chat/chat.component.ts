import {Component} from '@angular/core';
import {ChatService} from './chat.service';
import {Router} from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent {
  chats: any;
  room: any = 'all';
  currentuser: any;
  userkey: any;
  users: any;
  text: any;
  chatData= {
   name: '',
   date: 0,
   text: ''
  };
  constructor(public router: Router, public chatService: ChatService) {
     //chatService.chats.child(this.currentuser._id+'-my').push({name:'yyc'});
     this.room = 'all';
     this.chats = chatService.getData('all');
     this.currentuser = JSON.parse(localStorage.getItem('token'));
     console.log(this.currentuser._id+'-my');
     chatService.users.push(this.currentuser).then((res) => {
            this.userkey = res.key;
     });
      window.onbeforeunload = (e) => {
        chatService.users.child(this.userkey).remove();
      };
     this.users = chatService.getUser();
     this.chatData.name = this.currentuser.local.name;
  }


  refresh(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.value;
    console.log(id);
    this.room = (this.currentuser._id < id ? (this.currentuser._id+'-'+id) : (id + '-' +this.currentuser._id));
    // this.chatService.chats.child(this.room).push({name:'test'});
    this.chats = this.chatService.getData((id==='all') ?'all' : (this.room));
  }


  ngOnDestroy() {
     console.log(123);
     this.chatService.users.child(this.userkey).remove();
  }

  send(){
    this.chatData.date = new Date().getTime();
     this.chatService.chats.child(this.room).push(this.chatData);
  }


}
