// GLOBAL IMPORT
import {Component} from '@angular/core';
import { Router } from '@angular/router';

import{AuthService} from './../auth.service';


@Component({
	selector: 'my-signup',
	templateUrl: './signup.component.html'
})

export class SignUpComponent {

	error: string; // the possible error message when signup
    result: any;
	signupData = {
		username: '',
		password: '',
		email: '',
		name: ''
	};

	password_confirm: string;

	constructor(private router: Router, private authService: AuthService){
		if (localStorage.getItem('token')) {
			router.navigate(['']);
		}
	}

	// signin the new user if signup successfully
	signin(username: string, password: string){
		this.authService.signin(username, password)
			.subscribe(
				data => {
					location.reload();
				},
				error => {
					console.log(error);
					this.error = error._body.split("<pre>")[1].split("</pre>")[0];
				}
			);
	}

	// create the new user
	signup(){

		let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

		if(this.signupData.name.length >10 || this.signupData.name.length <=0) {
			this.error = "Name is needed or it is too long!";

		}else if(!re.test(this.signupData.email)) {
			this.error = "Email is not correct!";

		}else if (!this.signupData.username) {
			this.error = "Username is needed!";

		}else if (this.password_confirm !== this.signupData.password) {
            this.error = "Password are not matched!";

		}else {
			this.authService.signup(this.signupData)
                .subscribe(
					data => {
						this.signin(this.signupData.username, this.signupData.password);
					},
					error => {
						console.log(error.text());
						this.error = error._body.split("<pre>")[1].split("</pre>")[0];
					}
				);


		}
	}

}
