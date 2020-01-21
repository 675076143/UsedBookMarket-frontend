
import headerNav from '../components/header/nav';

import navigate from '../components/footer/navigate.vue'
import productcard from '../components/common/productcard.vue'
// import {
//   Tag,
//   Col,
//   Icon,
//   Cell,
//   CellGroup,
//   Swipe,
//   Toast,
//   SwipeItem,
//   GoodsAction,
//   GoodsActionBigBtn,
//   GoodsActionMiniBtn,
//   Actionsheet,
//   Sku,
//   Card,Button,SwipeCell,Dialog,Tab, Tabs,Row,Checkbox, CheckboxGroup, SubmitBar,NavBar,Tabbar, TabbarItem,Panel,List,Step, Steps,Field ,
//   Badge, BadgeGroup,Popup,Stepper,RadioGroup, Radio,Picker,Uploader,Info
// } from 'vant';
import {
  AddressEdit,
  Tag,
  Button,
  Area,
  Checkbox,
  CheckboxGroup,
  CountDown,
  DatetimePicker,
  Dialog,
  DropdownItem,
  Field,
  ImagePreview,
  Lazyload,
  List,
  Locale,
  Notify,
  Picker,
  Sku,
  Swipe,
  SwipeCell,
  Tabs,
  Toast,
  Uploader,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Cell,
  CellGroup,
  Row,
  Col,
  Info,
  Icon,
  ActionSheet,
  Sidebar,
  SidebarItem, Card, Stepper, SubmitBar, DropdownMenu
} from 'vant'
// const components=[
//     Tag,
//     Col,
//     Icon,
//     Cell,
//     CellGroup,
//     Swipe,
//     SwipeItem,
//     GoodsAction,
//     GoodsActionBigBtn,
//     GoodsActionMiniBtn,
//     Actionsheet,
//     Sku,
//     Card,
//     Button,
//     SwipeCell ,
//     Dialog ,
//     headerNav,
//     Tab, Tabs,Toast,Row,Checkbox, CheckboxGroup, SubmitBar,NavBar ,Tabbar, TabbarItem,navigate,Panel,List ,Step, Steps,Field ,
//     Badge, BadgeGroup,Popup,productcard,Stepper,RadioGroup, Radio,Picker,Uploader,Info
// ]
const components=[
  Button,Cell,CellGroup,Row,Col,Info,Icon,ActionSheet,Tag,Sidebar,SidebarItem,
    Area,
    Checkbox,
    CheckboxGroup,
    CountDown,
    DatetimePicker,
    Dialog,
    DropdownItem,
    Field,
    ImagePreview,
    List,
    Picker,
    Sku,
    Swipe,
    SwipeCell,
    Tabs,
    Uploader,
    GoodsAction,GoodsActionIcon,GoodsActionButton,Card,Stepper,SubmitBar,
    headerNav, navigate,productcard,DropdownMenu
]

export default (Vue)=>{
    components.forEach(Component => {
        Vue.component(Component.name, Component)
    });
}
