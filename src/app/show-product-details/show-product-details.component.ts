import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {

  productDetails: Product[] = [];

  displayedColumns: string[] = ['ID', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];

  constructor(private productService: ProductService, public imagesDialog: MatDialog, private imageProcessingService: ImageProcessingService
    ,private router:Router) {

  }

  ngOnInit() {
    this.getAllProducts()
  }
  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          this.productDetails = response;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }


  deleteProduct(productId: Product) {
    console.log(productId);

    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        console.log(response)
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )

  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,
      {
        data: {
          images: product.productImages
        },
        height: '60%',
        width: '60%'
      }
    );
  }

  editProductDetails(productId:number){
    this.router.navigate(['/addNewProduct',{productId:productId}]);
  }



}
