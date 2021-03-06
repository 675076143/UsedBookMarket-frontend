/*
* 在axios的基础上
* 封装ajax
* 函数的返回值是promise对象
* 优化： 不返回response,直接返回response.data
*       resolve(response) => resolve(response.data)
* 使用NProgress在发送请求时显示进度条
* */
import axios from 'axios'
import qs from 'qs'

export default function ajax (url, data={}, method="GET",that) {

    //返回Promise对象
    //在函数内部处理异常
    return new Promise((resolve) => {
        that.$Loading.start()
        let promise
        //1. 执行异步Ajax请求
        if (method==="GET"){//get请求
            // console.log("Get data:",data)
            promise = axios.get(url, {
                params: data
            })
        }else if(method==="PUT"){//put请求
            // console.log("Put data: ",data)
            console.log(data)
            promise = axios.put(url, data)
        }else if(method==="DELETE"){//delete请求
            console.log(data)
            promise = axios.delete(url,data)
        }
        else if(method==='POST') {//post请求
            promise = axios.post(url,data)
        }else {
            console.log("error option!")
        }
        //2. 如果成功了，调用resolve
        promise.then(response=>{
            resolve(response.data)
            that.$Loading.finish();
        })
        //3. 如果失败了，调用reject
        promise.catch(error=>{
            //这里不调用reject，只需提示错误即可
            //reject(error)
            //使用antd的message
            that.$Loading.error();
        })

    })


}