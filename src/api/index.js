import ajax from './ajax'
const BASE_URL = ''
// const BASE_URL = 'http://114.55.36.231:9000'
export const reqLogin = (userName,password,that) => {
    // console.log({userName,password})
    return ajax(BASE_URL+'/authentication/login',{userName,password},'POST',that)
}
export const reqProducts = (pageNum,pageSize,that)=>{
    return ajax(BASE_URL+'/api/products',{pageNum,pageSize},'GET',that)
}
export const reqCategories = (that)=>{
    return ajax(BASE_URL+'/api/categories',{},'GET',that)
}
export const reqBooksByCategory = (categoryName,that)=>{
    return ajax(BASE_URL+'/api/books',{categoryName},'GET',that)
}
export const reqBookDetails = (bookId,that)=>{
    return ajax(BASE_URL+'/api/books/'+bookId,{},'GET',that)
}
export const reqAddSellingBook = (book,that)=>{
    return ajax(BASE_URL+'/api/books',book,'POST',that)
}
export const reqUpload = (file,that)=>{
    return ajax(BASE_URL+'/api/upload',file,'POST',that)
}
