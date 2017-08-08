import { Directive, ElementRef, Input } from '@angular/core';
import * as $ from "jquery";

@Directive({ selector: '[chat-body]' })

export class ChatDirective {
    constructor(el: ElementRef) {
             setTimeout(() => {
               let height =  $( window ).outerHeight()-$( '#todo-form').outerHeight()-$( '#chatheader').outerHeight()-10;
               $( '.panel-body').outerHeight( height);
               $( '.userlist').outerHeight( height);
               $( ".chat-body p" ).css( "maxWidth", $( ".chat-body" ).innerWidth() );
            }, 0);
      $(window).resize(function(){
           setTimeout(() => {
               let height =  $( window ).outerHeight()-$( '#todo-form').outerHeight()-$( '#chatheader').outerHeight()-10;
               $( '.panel-body').outerHeight( height);
               $( '.userlist').outerHeight( height);
                $( ".chat-body p" ).css( "maxWidth", $( ".chat-body" ).innerWidth() );
            }, 0);
      });

       //el.nativeElement.style.backgroundColor = 'yellow';
    }
}
