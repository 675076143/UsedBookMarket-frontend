
import headerNav from '../components/header/nav';

import navigate from '../components/footer/navigate.vue'
import productcard from '../components/common/productcard.vue'

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
  SidebarItem, Card, Stepper, SubmitBar, DropdownMenu,
  NavBar, Popup, Switch
} from 'vant'

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
    headerNav, navigate,productcard,DropdownMenu,Toast,NavBar,Popup,Switch
]

export default (Vue)=>{
    components.forEach(Component => {
        Vue.component(Component.name, Component)
    });
}
