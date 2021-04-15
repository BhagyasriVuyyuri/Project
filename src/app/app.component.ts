import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FLIPKARTAPP';
  username;
 
  constructor(private router:Router){}
  ngOnInit():void{
    this.username=localStorage.getItem("username")
  
  
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("login")
   // window.location.reload();
  }
}
