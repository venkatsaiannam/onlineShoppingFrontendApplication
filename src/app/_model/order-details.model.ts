import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    fullName:String;
	fullAddress:String; 
	contactNumber:String;
	alternateContactNumber:String;
	transactionId:String;
	orderProductQuantityList:OrderQuantity[];

}