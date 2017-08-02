import { Directive, ElementRef, Input } from '@angular/core';
import * as $ from "jquery";

@Directive({ selector: '[chat-body]' })

export class ChatDirective {
    constructor(el: ElementRef) {
                 setTimeout(() => {

               $( '#chatlist').outerHeight( $( window ).outerHeight()-$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
                $( '.userlist').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
            }, 0);
      $(window).resize(function(){
           setTimeout(() => {


                $( '#chatlist').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
                $( '.userlist').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
            }, 0);
      });

       //el.nativeElement.style.backgroundColor = 'yellow';
    }
}
