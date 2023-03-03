import{_ as w,e as b,g as m,o as d,c as r,a as e,f as v,F as O,h as y,n as A,t as n,p as u,r as T,b as I}from"./index-ef6c4353.js";const{VITE_API_URL:C,VITE_API_PATH:E}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"frank-hex-api",BASE_URL:"/live-vue3-training-homework-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},V={name:"OrderPagination",data(){return{pagination:{}}},methods:{async pageChange(t){(t!==this.pagination.current_page||t>=0||t<=this.pagination.total_pages)&&await this.getOrders(t)},async getOrders(t=1){const{data:s}=await b.get(`${C}/api/${E}/admin/orders?page=${t}`,{headers:{Authorization:`${m()}`}});this.$emit("page-changed",s.orders),this.pagination=s.pagination}},async mounted(){await this.getOrders()}},x={"aria-label":"Page navigation"},R={class:"pagination justify-content-center"},B={class:"page-item"},L=e("span",{"aria-hidden":"true"},"«",-1),U=[L],M=["onClick"],S={class:"page-item"},D=e("span",{"aria-hidden":"true"},"»",-1),H=[D];function z(t,s,o,h,_,a){return d(),r("nav",x,[e("ul",R,[e("li",B,[e("a",{class:"page-link",href:"#",onClick:s[0]||(s[0]=v(i=>a.pageChange(_.pagination.current_page-1),["prevent"]))},U)]),(d(!0),r(O,null,y(_.pagination.total_pages,i=>(d(),r("li",{class:A(["page-item",{active:_.pagination.current_page===i}]),key:i},[e("a",{class:"page-link",href:"#",onClick:v(p=>a.pageChange(i),["prevent"])},n(i),9,M)],2))),128)),e("li",S,[e("a",{class:"page-link",href:"#",onClick:s[1]||(s[1]=v(i=>a.pageChange(_.pagination.current_page+1),["prevent"]))},H)])])])}const N=w(V,[["render",z]]),{VITE_API_URL:j,VITE_API_PATH:q}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"frank-hex-api",BASE_URL:"/live-vue3-training-homework-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},F={name:"OrderModal",data(){return{modal:{}}},props:{selectedOrder:{type:Object,required:!0}},methods:{removeProduct(t){delete this.order.products[t.id],this.order.total=this.calculateTotal()},calculateTotal(){let t=0;for(let s in this.order.products)t+=this.order.products[s].final_total;return t},async updateOrder(){let t=this.$loading.show();const{data:s}=await this.axios.put(`${j}/api/${q}/admin/order/${this.order.id}`,{data:this.order},{headers:{Authorization:m()}});t.hide(),s.success?(this.$swal({title:"訂單更新成功",icon:"success"}),this.$emit("update-order")):this.$swal({title:"訂單更新失敗",icon:"error"})}},computed:{order(){return{...this.selectedOrder}}}},G={class:"modal fade",id:"orderModal",tabindex:"-1","aria-labelledby":"updateOrderModalLabel","aria-hidden":"true"},J={class:"modal-dialog modal-xl"},K={class:"modal-content"},Q=e("div",{class:"modal-header"},[e("h1",{class:"modal-title fs-5",id:"updateOrderModalLabel"}," 訂單詳細資訊 "),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),W={class:"modal-body"},X={class:"row"},Y={class:"card"},Z={class:"card-body"},ee={class:"row mb-3"},te={class:"col-md-4"},se=e("strong",null,"訂單編號：",-1),oe={class:"col-md-4"},ae=e("strong",null,"訂單日期：",-1),ne={class:"col-md-4"},de=e("strong",null,"訂單狀態：",-1),re={class:"row mb-3"},ie={class:"col-md-4"},le=e("strong",null,"客戶姓名：",-1),ce={class:"col-md-4"},_e=e("strong",null,"客戶電話：",-1),ue={class:"col-md-4"},he=e("strong",null,"客戶地址：",-1),pe={class:"row mb-3"},ge={class:"col-md-4"},me=e("strong",null,"客戶信箱：",-1),be={class:"col-md-8"},Oe=e("strong",null,"留言：",-1),ve={class:"table table-striped"},fe=e("thead",null,[e("tr",null,[e("th",null,"產品名稱"),e("th",null,"數量"),e("th",null,"單價"),e("th",null,"小計"),e("th")])],-1),$e=["onClick"],we={class:"modal-footer"};function ye(t,s,o,h,_,a){var i,p,l,g;return d(),r("div",G,[e("div",J,[e("div",K,[Q,e("div",W,[e("div",X,[e("div",Y,[e("div",Z,[e("div",ee,[e("div",te,[se,u(" "+n(o.selectedOrder.id),1)]),e("div",oe,[ae,u(" "+n(o.selectedOrder.create_at),1)]),e("div",ne,[de,e("span",{class:A(["badge rounded-pill",o.selectedOrder.is_paid?"bg-success":"bg-danger"])},n(o.selectedOrder.is_paid?"已付款":"未付款"),3)])]),e("div",re,[e("div",ie,[le,u(" "+n((i=o.selectedOrder.user)==null?void 0:i.name),1)]),e("div",ce,[_e,u(" "+n((p=o.selectedOrder.user)==null?void 0:p.tel),1)]),e("div",ue,[he,u(" "+n((l=o.selectedOrder.user)==null?void 0:l.address),1)])]),e("div",pe,[e("div",ge,[me,u(" "+n((g=o.selectedOrder.user)==null?void 0:g.email),1)]),e("div",be,[Oe,u(" "+n(o.selectedOrder.message),1)])]),e("table",ve,[fe,e("tbody",null,[(d(!0),r(O,null,y(o.selectedOrder.products,c=>{var k,P;return d(),r("tr",{key:c.id},[e("td",null,n((k=c.product)==null?void 0:k.title),1),e("td",null,n(c.qty),1),e("td",null,n((P=c.product)==null?void 0:P.price),1),e("td",null,n(c.final_total),1),e("td",null,[e("button",{class:"btn btn-close btn-sm",onClick:Ue=>a.removeProduct(c)},null,8,$e)])])}),128))])])])])])]),e("div",we,[e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal",onClick:s[0]||(s[0]=(...c)=>a.calculateTotal&&a.calculateTotal(...c))},"關閉"),e("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=(...c)=>a.updateOrder&&a.updateOrder(...c))},"更新")])])])])}const ke=w(F,[["render",ye]]),{VITE_API_URL:f,VITE_API_PATH:$}={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"frank-hex-api",BASE_URL:"/live-vue3-training-homework-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Pe={name:"OrdersView",data(){return{orders:[],selectedOrder:{}}},components:{OrderModal:ke,OrderPagination:N},methods:{async deleteOrder(t){const{isConfirmed:s}=await this.$swal({title:"是否刪除此訂單？",icon:"warning",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"確認",cancelButtonText:"取消"});if(s){const o=this.$loading.show(),{data:h}=await b.delete(`${f}/api/${$}/admin/order/${t.id}`,{headers:{Authorization:`${m()}`}});h.success&&(o.hide(),this.$swal({title:"已刪除訂單",icon:"success"}),await this.getOrders())}},async payOrder(t){const{isConfirmed:s}=await this.$swal({title:"是否調整付款狀態？",icon:"warning",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"確認",cancelButtonText:"取消"});if(s){const o=this.$loading.show(),{data:h}=await b.post(`${f}/api/${$}/pay/${t.id}`,{headers:{Authorization:`${m()}`}});h.success&&(o.hide(),this.$swal({title:"付款成功",icon:"success"}),await this.getOrders())}},async getOrders(){let t=this.$loading.show();const{data:s}=await b.get(`${f}/api/${$}/admin/orders`,{headers:{Authorization:`${m()}`}});this.orders=s.orders,t.hide()},setOrders(t){this.orders=t},formatMoney(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},computed:{},async mounted(){await this.getOrders()}},Te=e("h1",null,"訂單總覽",-1),Ie={class:"table"},Ae=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"消費者"),e("th",{scope:"col"},"付款狀態"),e("th",{scope:"col"},"手動調整付款"),e("th",{scope:"col"},"總價"),e("th",{scope:"col"})])],-1),Ce={key:0,class:"badge rounded-pill bg-success ms-2"},Ee={key:1,class:"badge rounded-pill bg-danger ms-2"},Ve=["onClick"],xe={key:1},Re=["onClick"],Be=["onClick"];function Le(t,s,o,h,_,a){const i=T("order-pagination"),p=T("order-modal");return d(),r(O,null,[Te,e("table",Ie,[Ae,e("tbody",null,[(d(!0),r(O,null,y(_.orders,l=>(d(),r("tr",{key:l.id},[e("th",null,n(l.user.name),1),e("td",null,[l.is_paid?(d(),r("span",Ce,"已付款")):(d(),r("span",Ee,"尚未付款"))]),e("td",null,[l.is_paid?(d(),r("span",xe,"-")):(d(),r("button",{key:0,type:"button",class:"btn btn-outline-primary",onClick:g=>a.payOrder(l)},"付款 ",8,Ve))]),e("td",null,n(a.formatMoney(l.total))+" 元 ",1),e("td",null,[e("button",{type:"button",class:"btn btn-outline-primary me-2","data-bs-toggle":"modal","data-bs-target":"#orderModal",onClick:g=>_.selectedOrder=l},"詳細資料",8,Re),e("button",{type:"button",class:"btn btn-outline-danger",onClick:g=>a.deleteOrder(l)},"刪除",8,Be)])]))),128))])]),I(i,{onPageChanged:a.setOrders},null,8,["onPageChanged"]),I(p,{"selected-order":_.selectedOrder,onUpdateOrder:a.getOrders},null,8,["selected-order","onUpdateOrder"])],64)}const Se=w(Pe,[["render",Le]]);export{Se as default};
