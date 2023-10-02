import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger.service';
//import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public signupForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router, private logger : LoggerService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
      mobile: ['', Validators.required]
    });
  }
  signUp(){
    this.http.post<any>(environment.signupUsers,this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      this.logger.log(`Signup Successfull`)
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went Wrong");
      this.logger.error(`Something went Wrong`)
    })

  }



}
