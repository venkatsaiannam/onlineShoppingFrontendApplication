import { response } from 'express';
import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Discounted Price','Price','Action'];

  constructor(private productService: ProductService,private router:Router) {

  }

  cartDetails: any[] = [];

  ngOnInit() {
    this.getCartDetails();

  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  checkout() {
    // this.productService.getProductDetails(false,0).subscribe(
    //   (response)=>{
    //     console.log(response);
    //   },
    //   (error)=>{
    //     console.log(error)
    //   }
    // )

    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  delete(cartId){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getCartDetails();
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
