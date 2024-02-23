import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {

  isNewProduct = true;

  product: Product = {
    productId:null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(){
    this.product = this.activatedRoute.snapshot.data['product'];
    if(this.product && this.product.productId){
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    // console.log(productForm.value);

    const productFormData = this.prepareFormData(this.product)
    console.log(productFormData)
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        //console.log(response);
        productForm.reset()
        this.product.productImages=[]
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  prepareFormData(product:Product):FormData{
    const formData = new FormData;

    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i =0;i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }

    return formData;
  }

  // onFileSelected($event:Event){
  //   console.log(event);
  //   if(event?.target.files[0]){

  //   }

  onFileSelected(event: Event) {
    console.log(event);
    if (event && event.target) { // Check if event and event.target are not null
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        this.product.productImages.push(fileHandle);
        console.log(file)
      }
    }
  }

  removeImages(i:number){
    this.product.productImages.splice(i,1);

  }

  fileDropped(fileHandle:FileHandle){

    this.product.productImages.push(fileHandle);
  }

}

