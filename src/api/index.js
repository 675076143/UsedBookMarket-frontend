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
export const reqBooksByCategory = (categoryID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{categoryID},'GET',that)
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
export const reqModifyBook = (book,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',book,'PUT',that)
}
export const reqDeleteBook = (book,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',book,'DELETE',that)
}