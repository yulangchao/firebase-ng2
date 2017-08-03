import { Directive, ElementRef, Input } from '@angular/core';
import * as $ from "jquery";

@Directive({ selector: '[chat-body]' })

export class ChatDirective {
    constructor(el: ElementRef) {
             setTimeout(() => {
               $( '.panel-body').outerHeight( $( window ).outerHeight()-$( '#todo-form').outerHeight()-$( '#chatheader').outerHeight()-10);
               $( '#myNavbar').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
               $( ".chat-body p" ).css( "maxWidth", $( ".chat-body" ).innerWidth() );
            }, 0);
      $(window).resize(function(){
           setTimeout(() => {


                $( '.panel-body').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chatheader').outerHeight()-10);
                $( '#myNavbar').outerHeight( $( window ).outerHeight() -$( '#todo-form').outerHeight()-$( '#chat-header').outerHeight()-10);
                $( ".chat-body p" ).css( "maxWidth", $( ".chat-body" ).innerWidth() );
            }, 0);
      });

       //el.nativeElement.style.backgroundColor = 'yellow';
    }
}
