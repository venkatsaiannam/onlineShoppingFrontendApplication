import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {
  
  productDetails:Product[] = [];

  displayedColumns: string[] = ['ID', 'Product Name', 'Product Description', 'Product Discounted Price','Product Actual Price','Edit','Delete'];

  constructor(private productService:ProductService){

  }

  ngOnInit(){
    this.getAllProducts()
  }
  public getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (response:Product[])=>{
        this.productDetails = response;
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
    )
  }


  deleteProduct(productId:Product){
    console.log(productId);

    this.productService.deleteProduct(productId).subscribe(
      (response)=>{
        console.log(response)
        this.getAllProducts();
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
    )

  }

}
