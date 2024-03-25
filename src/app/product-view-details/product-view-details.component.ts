import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {

  selectProductIndex = 0;

  product!:Product;

  constructor(private activatedRoute:ActivatedRoute,private router:Router){

  }

  ngOnInit():void{
    this.product = this.activatedRoute.snapshot.data['product']
    console.log(this.product);
  }

  public changeIndex(i){
    this.selectProductIndex=i;
  }


  public buyProduct(productId){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,
      id:productId
    }]);
  }
}
