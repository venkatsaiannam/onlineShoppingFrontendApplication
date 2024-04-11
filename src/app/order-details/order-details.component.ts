import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  status:string='all';
  ngOnInit(){
    this.getAllOrderDetailsForAdmin(this.status);
  }

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.','Status','Action' ];

  dataSource:MyOrderDetails[] = [];
  constructor(private productService:ProductService){

  }

  getAllOrderDetailsForAdmin(statusParam){
    console.log('Status->'+this.status);
    this.status=statusParam
    this.productService.getAllOrderDetailsForAdmin(statusParam).subscribe(
      (resp)=>{
        console.log(resp)
        this.dataSource  = resp;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  markAsDelivered(orderId){
    console.log(orderId)
    this.productService.markAsDelivered(orderId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getAllOrderDetailsForAdmin(this.status);
      },
      (err)=>{
        console.log(err);
      }

    )

  }


}
