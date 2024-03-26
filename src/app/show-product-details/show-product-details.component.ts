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
  pageNumber: number = 0;
  showTable = false;
  showLoadMore = false;

  displayedColumns: string[] = ['ID', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];

  constructor(private productService: ProductService, public imagesDialog: MatDialog, private imageProcessingService: ImageProcessingService
    , private router: Router) {

  }

  ngOnInit() {
    this.getAllProducts()
  }
  public getAllProducts(searchkeyword:string = "") {
    this.showTable = false
    this.productService.getAllProducts(this.pageNumber,searchkeyword)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          if (response.length == 12) {
            this.showLoadMore = true
          }
          else {
            this.showLoadMore = false
          }
          response.forEach(p => this.productDetails.push(p))
          //this.productDetails = response;
          console.log("respose", response);
          console.log("productDetails", this.productDetails)
          this.showTable = true
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
  }

  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
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

  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);

  }



}
