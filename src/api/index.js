import ajax from './ajax'
import {BASE_URL} from "../utils/constants";

export const reqLogin = (userName,password,that) => {
    // console.log({userName,password})
    return ajax(BASE_URL+'/api/user/login.php',{userName,password},'POST',that)
}
export const reqRegister = (userName,password,that) => {
    // console.log({userName,password})
    return ajax(BASE_URL+'/api/user/register.php',{userName,password},'POST',that)
}
export const reqProducts = (pageNum,pageSize,that)=>{
    return ajax(BASE_URL+'/api/products',{pageNum,pageSize},'GET',that)
}
export const reqCategories = (that)=>{
    return ajax(BASE_URL+'/api/category/category.php',{},'GET',that)
}
export const reqBooksByCategory = (categoryID,schoolID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{categoryID,schoolID},'GET',that)
}
export const reqBookDetails = (bookID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{bookID},'GET',that)
}
export const reqAddSellingBook = (book,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',book,'POST',that)
}
export const reqUpload = (file,that)=>{
    return ajax(BASE_URL+'/api/upload/uploadImg.php',file,'POST',that)
}
export const reqPublished = (userID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{userID},'GET',that)
}
export const reqSold= (userID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{userID,orderSubState:'sold'},'GET',that)
}
export const reqModifyBook = (book,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',book,'PUT',that)
}
export const reqDeleteBook = (book,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',book,'DELETE',that)
}
export const reqShoppingCart = (userID,that)=>{
    return ajax(BASE_URL+'/api/shoppingCart/shoppingCart.php',{userID},'GET',that)
}
export const reqDeleteBookFromShoppingCart = (shoppingCartIdList,that)=>{
    return ajax(BASE_URL+'/api/shoppingCart/shoppingCart.php',shoppingCartIdList,'DELETE',that)
}
export const reqAddToCart = (bookID,userID,that)=>{
    return ajax(BASE_URL+'/api/shoppingCart/shoppingCart.php',{bookID,userID},'POST',that)
}
export const reqSubmitOrder = (bookList,userID,that)=>{
    return ajax(BASE_URL+'/api/order/order.php',{bookList,userID},'POST',that)
}
export const reqPayOrder = (orderID,userID,that)=>{
    return ajax(BASE_URL+'/api/order/order.php',{orderID,userID},'PUT',that)
}
export const reqOrder = (userID,orderState,that)=>{
    return ajax(BASE_URL+'/api/order/order.php',{orderState,userID},'GET',that)
}
export const reqModifyProfile = (userID,email,phone,balance,avatar,that)=>{
    return ajax(BASE_URL+'/api/user/user.php',{userID,email,phone,balance,avatar,},'PUT',that)
}
export const reqUser = (userID,that)=>{
    return ajax(BASE_URL+"/api/user/user.php",{userID},'GET',that)
}
export const reqSearchBooks = (bookName,categoryID,order,sort,that) =>{
    return ajax(BASE_URL+'/api/book/search.php',{bookName,categoryID,order,sort},'GET',that)
}
export const reqMessages = (from,to,that)=>{
    return ajax(BASE_URL+'/api/message/message.php',{from,to},'GET',that)
}
export const reqSendMessage = (from,to,message,that)=>{
    return ajax(BASE_URL+'/api/message/message.php',{from,to,message},'POST',that)
}
export const reqShipped = (orderSubID,that)=>{
    return ajax(BASE_URL+'/api/order/afterSold.php',{orderSubID,orderSubState: 2},'PUT',that)
}
export const reqReceived = (orderSubID,that)=>{
    return ajax(BASE_URL+'/api/order/afterSold.php',{orderSubID,orderSubState: 3},'PUT',that)
}
export const reqSellerRating = (orderSubID,sellerRating,sellerRatingDesc,that)=>{
    return ajax(BASE_URL+'/api/order/afterSold.php',{orderSubID,sellerRating,sellerRatingDesc,orderSubState: 3},'PUT',that)
}
export const reqBuyerRating = (orderSubID,buyerRating,buyerRatingDesc,that)=>{
    return ajax(BASE_URL+'/api/order/afterSold.php',{orderSubID,buyerRating,buyerRatingDesc,orderSubState: 3},'PUT',that)
}
export const reqRating = (userID,that)=>{
    return ajax(BASE_URL+'/api/user/rating.php',{userID},'GET',that);
}
export const reqCancelOrder = (orderID,that)=>{
    return ajax(BASE_URL+'/api/order/order.php',orderID,'DELETE',that)
}