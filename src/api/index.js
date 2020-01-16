import ajax from './ajax'
const BASE_URL = 'http://114.55.36.231:9000'
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
