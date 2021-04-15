import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  username;
  wishlist=[];
  p:any;
  userCartSize;
  product;
  successmessage;
  errormessage;
  userId;
  spinner=true;
  constructor(private us:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {

    this.username=localStorage.getItem("username")
    this.userId=localStorage.getItem("userId")
    this.getWishlist();
    this.cartStatus();
  }

  getWishlist(){
    this.us.getWishlistItems(this.userId).subscribe(
      res=>{
        this.spinner=false
        this.wishlist=res.message
        //console.log("the wishlist items",this.wishlist)
      },
      err=>{
        this.toastr.error("Something went wrong ")
        console.log(err)
      }
    )
  }

  cartStatus(){
    this.us.getCartSize(this.userId).subscribe(
      res=>{
        this.userCartSize=res["cartsize"];
      },
      err=>{
        this.toastr.error("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  additem(p){
    if(this.username!==null){
      let obj={
      username:this.username,
      userId:this.userId,
      productname:p.productname,
      productID:p.productID,
      brand:p.brand,
      colour:p.colour,
      rating:p.rating,
      category:p.category,
      quantity:1,
      cost:p.cost,
      description:p.description,
      productImgLink:p.productImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
         
            if(res["message"]=="success"){
              this.successmessage="Product added to cart";
              this.toastr.success(this.successmessage)
               
             // window.location.reload();
               this.router.navigateByUrl("/usercart")
            }
           
            if(res["message"]=="Item already added"){
             this.errormessage="Item already added...";
             this.toastr.error(this.errormessage)
           //  this.router.navigateByUrl("/usercart")
           }
           
          },
         
      
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  
  delete(n:number){
    let obj=this.wishlist[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteWishlistProduct(obj).subscribe(
      res=>{
        if(res.message){
          this.toastr.warning("Product removed from wishlist")
          window. location. reload ();
        }
      },
      err=>{
        this.toastr.error("Something went wrong in user creation");
        console.log(err);
      }
    )
  }

  goto(){
    this.router.navigateByUrl("/home")
  }

}
