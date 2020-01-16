/*
* 存储User的Storage工具
* 登录持久化
* 使用localStorage(对旧版本的浏览器不支持)
* 改用storage库
* */
import store from 'store'

const USER_KEY='user_key'


export default {
    //保存User
    setUser(user){
        //localStorage.setItem(USER_KEY, user)
        store.set(USER_KEY,user)
    },
    //获取User
    getUser(){
        //返回JSON格式的user
        //return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
        return store.get(USER_KEY) || {}
    },
    //删除User
    removeUser(){
        //localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}