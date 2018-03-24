import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailValidator } from '../../../shared/directives/emailValidator.directive';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService,UserService]
})

export class LoginComponent implements OnInit {

  mail:string;
  password:any;

  constructor( private auth:AuthService,private userServ:UserService, private router:Router) { }

  ngOnInit() {
    this.userServ.getAll().subscribe(data => {
      console.log(data)
    })
  }

  onSubmit(data){
    this.auth.login(data.email,data.password).subscribe(data => {
      setTimeout(() => {
        this.router.navigate(['profile-tracker'])
      }, 3000);
    })
  }

}
