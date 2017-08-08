import { Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../sass/main.scss']
})
export class AppComponent {

//define variable
    private isAuthenticate: any;
    private authService: any;
    private navbutton: boolean = false;

    constructor(private translate: TranslateService, authService: AuthService) {
        translate.addLangs(["en", "cn"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|cn/) ? browserLang : 'en');
        this.authService = authService;
        this.isAuthenticate = authService.isAuthenticate();

    }

    isChat(){
      return window.location.pathname === '/chat';
    }
 }
