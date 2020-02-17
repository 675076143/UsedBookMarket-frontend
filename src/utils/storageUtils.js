/*
* 存储User的Storage工具
* 登录持久化
* 使用localStorage(对旧版本的浏览器不支持)
* 改用storage库
* */
import store from 'store'

const USER_KEY='user_key';
const SCHOOL_KEY='school_key';

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
    },
    //保存school
    setSchool(school){
        //localStorage.setItem(USER_KEY, user)
        store.set(SCHOOL_KEY,school)
    },
    //获取User
    getSchool(){
        //返回JSON格式的user
        //return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
        return store.get(SCHOOL_KEY) || null;
    },
    //删除User
    removeSchool(){
        //localStorage.removeItem(USER_KEY)
        store.remove(SCHOOL_KEY)
    }
}