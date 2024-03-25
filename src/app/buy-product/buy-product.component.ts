import { ProductService } from './../_services/product.service';
import { OrderDetails } from './../_model/order-details.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {
  orderDetails:OrderDetails ={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductService,private router:Router
    ){

  }

  productDetails:Product[]=[];

  ngOnInit(){
    this.productDetails = this.activatedRoute.snapshot.data['productDetails']
    
    this.productDetails.forEach(
      x=> this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );

    console.log(this.orderDetails)
    console.log(this.productDetails)

  }


  

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (err)=>{
        console.log(err);
      }

    );

  }

  public getQuantityForProduct(productId){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId===productId
    )

    return filteredProduct[0].quantity;
  }

  public getCalculatedTotal(productId,productDiscountedPrice){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId === productId
    );

    return filteredProduct[0].quantity*productDiscountedPrice;

  }

  onQunatityChanged(q,productId){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId ===productId
    )[0].quantity = q;
  }
  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice
        grandTotal = grandTotal+  price * productQuantity.quantity;
      }
    )

    return grandTotal;
  }

}
