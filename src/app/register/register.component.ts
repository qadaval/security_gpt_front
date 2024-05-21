import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user";
import {AuthenticationService} from "../service/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy, OnInit {

  //check if there is a different way to implement this
  user:User ={
    username:'',
    password : ''
  };

  signupForm: FormGroup | undefined;
  loading=false;
  submitted = false;
  returnUrl: string | undefined;
  error= '';

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    if(this.authService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { // @ts-ignore
    return this.signupForm.controls; }


  onSubmit(){
    let data : User = {
      username: this.f['username'].value,
      password:this.f['password'].value
    };

    this.authService.register(data).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.submitted = true;
          this.router.navigate([this.returnUrl])
        },
        error: (e) => console.error(e)
      });
  }

  ngOnDestroy(): void {
  }



}
