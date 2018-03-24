import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService, UserService]

})
export class RegisterComponent implements OnInit {

  model:any = {}

  constructor(private auth: AuthService, private userServ: UserService, private router: Router) { }

  ngOnInit() {
  }
  
  onSubmit(data){
    console.log(data)
    this.userServ.create(data).subscribe(data => {
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 3000);
    })
  }

}
