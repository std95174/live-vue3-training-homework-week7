import{_ as h,r as n,o as f,c as w,a as s,b as o,w as v,n as u}from"./index-d187ca93.js";const b={name:"LoginView",data(){return{user:{username:"",password:""}}},methods:{async login(){let a=this.$loading.show();try{const{data:e}=await this.axios.post("https://vue3-course-api.hexschool.io/v2/admin/signin",this.user);if(a.hide(),e.success){const{token:i,expired:l}=e;document.cookie=`hexToken=${i}; expires=${new Date(l)}; path=/`,await this.$swal({title:"登入成功",icon:"success",showConfirmButton:!0}),await this.$router.push({name:"products"})}else this.$swal({title:"登入失敗",icon:"error",timer:1500,showConfirmButton:!0})}catch(e){a.hide(),e&&this.$swal({title:"登入失敗",icon:"error",timer:1500,showConfirmButton:!0})}}}},g={class:"container d-flex align-items-center justify-content-center vh-100"},x={class:"card w-25"},V=s("div",{class:"card-header"},"登入",-1),y={class:"card-body"},k={class:"form-group mb-3"},$=s("label",{for:"帳號",class:"form-label"},"帳號",-1),B={class:"form-group mb-3"},C=s("label",{for:"password"},"密碼",-1),q=s("div",{class:"text-center"},[s("button",{type:"submit",class:"btn btn-primary"}," 登入 ")],-1);function L(a,e,i,l,t,p){const c=n("v-field"),d=n("error-message"),_=n("v-form");return f(),w("div",g,[s("div",x,[V,s("div",y,[o(_,{ref:"form",onSubmit:p.login},{default:v(({errors:m})=>[s("div",k,[$,o(c,{id:"user-name",name:"帳號",type:"email",class:u(["form-control",{"is-invalid":m.帳號}]),placeholder:"請輸入帳號",rules:"required|email",modelValue:t.user.username,"onUpdate:modelValue":e[0]||(e[0]=r=>t.user.username=r)},null,8,["class","modelValue"]),o(d,{name:"帳號",class:"invalid-feedback"})]),s("div",B,[C,o(c,{id:"password",name:"密碼",type:"password",class:u(["form-control",{"is-invalid":m.密碼}]),placeholder:"請輸入密碼",rules:"required",modelValue:t.user.password,"onUpdate:modelValue":e[1]||(e[1]=r=>t.user.password=r)},null,8,["class","modelValue"]),o(d,{name:"密碼",class:"invalid-feedback"})]),q]),_:1},8,["onSubmit"])])])])}const S=h(b,[["render",L]]);export{S as default};
