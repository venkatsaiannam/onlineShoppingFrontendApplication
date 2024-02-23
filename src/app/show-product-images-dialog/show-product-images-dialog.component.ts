import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';



@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css']
})
export class ShowProductImagesDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA)  public data:any){
    
  }

  ngOnInit(){
    this.receiveImages();
  }

  public receiveImages(){
    console.log(this.data);
  }

}
