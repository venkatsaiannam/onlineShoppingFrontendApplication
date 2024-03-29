import { OrderDetails } from './../_model/order-details.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  public getAllProducts(pageNumber, searchkeyword: string = "") {
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchkeyword);
  }

  public deleteProduct(productId) {
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" + productId);
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/" + productId)
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/" + isSingleProductCheckout + "/" + productId)

  }

  public placeOrder(orderDetails: OrderDetails) {
    return this.httpClient.post("http://localhost:9090/placeOrder", orderDetails);
  }

}
