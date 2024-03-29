import {Component, ViewChild, ElementRef, OnInit, AfterViewChecked} from '@angular/core';
import {ChatService} from './chat.service';
import {Router} from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
  roomname: any = 'ALL';
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


    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }


  refresh(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    console.log(target);
    let id = target.attributes.id.value;
    console.log(id);
    if(id == 'all'){
      this.room = 'all';
    }else {
      this.room = (this.currentuser._id < id ? (this.currentuser._id+'-'+id) : (id + '-' +this.currentuser._id));
    }
    // this.chatService.chats.child(this.room).push({name:'test'});
    this.chats = this.chatService.getData(this.room);
  }


  ngOnDestroy() {
     this.chatService.users.child(this.userkey).remove();
  }

  send(){
    this.chatData.date = new Date().getTime();
     this.chatService.chats.child(this.room).push(this.chatData);
  }


}
