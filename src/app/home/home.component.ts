import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];
  pageNumber: number = 0;
  showLoadButton = false;
  constructor(private userService: UserAuthService, private productService: ProductService, private imageProcessingService: ImageProcessingService,
    private router: Router) {

  }

  ngOnInit() {
    //this.userService.clear();
    this.getAllProducts()
  }

  public getAllProducts() {
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          if (response.length == 12) {
            this.showLoadButton = true
          }
          else{
            this.showLoadButton = false
          }
          response.forEach(p => this.productDetails.push(p));
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

  public showProductDetails(productId) {
    this.router.navigate(['/productViewDetails', { productId: productId }])
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts()
  }

}
