// GLOBAL IMPORT
import {Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
// SERVICES IMPORT
import{AuthService} from './../auth.service';

@Component({
	selector: 'my-signin',
	templateUrl: './signin.component.html'
})

export class SignInComponent {

	signinData = {
		username: '',
		password: ''
	};
	error: string;

	constructor(private router: Router, private authService: AuthService){
		if (localStorage.getItem('token')) {
			router.navigate(['']);
		}
	}

	onSubmit(){
		if (!this.signinData.username) {
			this.error = "Username is needed!";

		}else if (!this.signinData.password) {
			this.error = "Password is needed!";

		}else {
			this.authService.signin(this.signinData.username, this.signinData.password)
                .subscribe(
					data => {
						location.reload();
					},
					error => {
						console.log(error);
						this.error = error._body.split("<pre>")[1].split("</pre>")[0];
					});
		}

	}
}
