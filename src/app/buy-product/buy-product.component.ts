import { ProductService } from './../_services/product.service';
import { OrderDetails } from './../_model/order-details.model';
import { Component, Injector, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
//import * as Razorpay from 'razorpay';


declare var Razorpay:any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {

  isSingleProductCheckout: string = "";

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId:'',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService, private router: Router,private injector:Injector
  ) {

  }

  productDetails: Product[] = [];

  ngOnInit() {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails']
    const paramValue = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    if (paramValue !== null) {
      this.isSingleProductCheckout = paramValue;
    } else {
      this.isSingleProductCheckout = "";
    }
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );

    console.log(this.orderDetails)
    console.log(this.productDetails)

  }




  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        const ngZone = this.injector.get(NgZone)
        ngZone.run(
          ()=>{
            this.router.navigate(["/orderConfirm"]);
          }
        )
        
      },
      (err) => {
        console.log(err);
      }

    );

  }

  public getQuantityForProduct(productId) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    )

    return filteredProduct[0].quantity;
  }

  public getCalculatedTotal(productId, productDiscountedPrice) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;

  }

  onQunatityChanged(q, productId) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }
  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    )

    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm:NgForm){

    let amount = this.getCalculatedGrandTotal();

    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response);
        this.openTransactionModel(response,orderForm);
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  openTransactionModel(response:any,orderForm:NgForm){
    var options = {
      order_id:response.order_id,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:'Learn programming yourself',
      description:'Payment of Online Shopping',
      image: 'https://cdn.pixabay.com/photo/2020/05/09/13/21/the-tree-5149637_1280.jpg',
      handler:(response:any)=>{
        if(response!=null && response.razorpay_payment_id != null){
          this.processResponse(response,orderForm);
        }
        else{
          alert("payment Failed");
        }
        
      },
      prefill:{
        name:'LPY',
        email:'LPY@GMAIL.COM',
        contact:'9848423735'
      },
      notes:{
        address:'online Shopping'
      },
      theme:{
        color:'#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();

  }

  processResponse(resp:any,orderForm:NgForm){
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm)
  }

}
