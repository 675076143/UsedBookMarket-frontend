import ajax from './ajax'
import {BASE_URL} from "../utils/constants";

export const reqLogin = (userName,password,that) => {
    // console.log({userName,password})
    return ajax(BASE_URL+'/api/user/login.php',{userName,password},'POST',that)
}
export const reqProducts = (pageNum,pageSize,that)=>{
    return ajax(BASE_URL+'/api/products',{pageNum,pageSize},'GET',that)
}
export const reqCategories = (that)=>{
    return ajax(BASE_URL+'/api/category/category.php',{},'GET',that)
}
export const reqBooksByCategory = (categoryName,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{categoryName},'GET',that)
}
export const reqBookDetails = (bookID,that)=>{
    return ajax(BASE_URL+'/api/book/book.php',{bookID},'GET',that)
}
export const reqAddSellingBook = (book,that)=>{
    return ajax(BASE_URL+'/api/books',book,'POST',that)
}
export const reqUpload = (file,that)=>{
    return ajax(BASE_URL+'/api/upload/uploadImg.php',file,'FILE',that)
}
