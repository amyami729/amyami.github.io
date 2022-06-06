(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-294d2b42"],{1799:function(e,t,c){"use strict";var o=c("7a23"),n={"aria-label":"Page navigation example"},r={class:"pagination"},l=Object(o["createElementVNode"])("span",{"aria-hidden":"true"},"«",-1),a=[l],d=["onClick"],i=Object(o["createElementVNode"])("span",{"aria-hidden":"true"},"»",-1),s=[i];function u(e,t,c,l,i,u){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[Object(o["createElementVNode"])("nav",n,[Object(o["createElementVNode"])("ul",r,[Object(o["createElementVNode"])("li",{class:Object(o["normalizeClass"])(["page-item",{disabled:!c.paginations.has_pre}])},[Object(o["createElementVNode"])("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[0]||(t[0]=Object(o["withModifiers"])((function(e){return u.getProductPages(c.paginations.current_page-1)}),["prevent"]))},a)],2),(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(c.paginations.total_pages,(function(e){return Object(o["openBlock"])(),Object(o["createElementBlock"])("li",{class:Object(o["normalizeClass"])(["page-item",{active:c.paginations.current_page===e}]),key:e},[Object(o["createElementVNode"])("a",{class:"page-link",href:"#",onClick:Object(o["withModifiers"])((function(t){return u.getProductPages(e)}),["prevent"])},Object(o["toDisplayString"])(e),9,d)],2)})),128)),Object(o["createElementVNode"])("li",{class:Object(o["normalizeClass"])(["page-item",{disabled:!c.paginations.has_next}])},[Object(o["createElementVNode"])("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[1]||(t[1]=Object(o["withModifiers"])((function(e){return u.getProductPages(c.paginations.current_page+1)}),["prevent"]))},s)],2)])])])}var b={props:{paginations:Object},methods:{getProductPages:function(e){this.$emit("emitGetProducts",e),document.body.scrollTop=document.documentElement.scrollTop=0}}},m=c("6b0d"),p=c.n(m);const h=p()(b,[["render",u]]);t["a"]=h},"1b08":function(e,t,c){},"3c21":function(e,t,c){"use strict";c("1b08")},"961f":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),n=function(e){return Object(o["pushScopeId"])("data-v-20def720"),e=e(),Object(o["popScopeId"])(),e},r={class:"text-right mt-4"},l={class:"table"},a=n((function(){return Object(o["createElementVNode"])("thead",null,[Object(o["createElementVNode"])("tr",null,[Object(o["createElementVNode"])("th",{class:"d-md-table-cell d-none"},"分類"),Object(o["createElementVNode"])("th",null,"產品圖片"),Object(o["createElementVNode"])("th",null,"產品名稱"),Object(o["createElementVNode"])("th",{class:"d-lg-table-cell d-none"},"原價"),Object(o["createElementVNode"])("th",{class:"d-lg-table-cell d-none"},"售價"),Object(o["createElementVNode"])("th",{class:"d-lg-table-cell d-none"},"是否啟用"),Object(o["createElementVNode"])("th",null,"編輯/刪除")])],-1)})),d={class:"d-md-table-cell d-none"},i=["src"],s={class:"d-lg-table-cell d-none"},u={class:"d-sm-table-cell d-none"},b={class:"d-lg-table-cell d-none"},m=["onClick"],p=["onClick"],h={class:"product-pagination"};function j(e,t,c,n,j,O){var f=Object(o["resolveComponent"])("loading"),g=Object(o["resolveComponent"])("productModal"),N=Object(o["resolveComponent"])("deleteModal"),V=Object(o["resolveComponent"])("pagination");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[Object(o["createVNode"])(f,{active:j.isLoading},null,8,["active"]),Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("button",{class:"btn btn-success",onClick:t[0]||(t[0]=function(){return O.createProduct&&O.createProduct.apply(O,arguments)})},"新增產品")]),Object(o["createElementVNode"])("table",l,[a,Object(o["createElementVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(j.products,(function(t){return Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{class:"align-middle",key:t.id},[Object(o["createElementVNode"])("td",d,Object(o["toDisplayString"])(t.category),1),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("img",{src:t.imageUrl,class:"thumbnail"},null,8,i)]),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(t.title),1),Object(o["createElementVNode"])("td",s,Object(o["toDisplayString"])(e.$filters.currency(t.origin_price)),1),Object(o["createElementVNode"])("td",u,Object(o["toDisplayString"])(e.$filters.currency(t.price)),1),Object(o["createElementVNode"])("td",b,Object(o["toDisplayString"])(t.is_enabled?"啟用":"未啟用"),1),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("button",{class:"btn btn-outline-success me-2 btn-sm",onClick:function(e){return O.editProduct(t)}},"編輯",8,m),Object(o["createElementVNode"])("button",{class:"btn btn-outline-danger me-2 btn-sm",onClick:function(e){return O.showDeleteProductModal(t)}},"刪除",8,p)])])})),128))])]),Object(o["createVNode"])(g,{ref:"productModal",currentItem:j.currentProduct,isNew:j.isNew,onEmitHide:t[1]||(t[1]=function(e){return O.showProductModal(!1)}),onEmitGetProducts:O.getProducts},{title:Object(o["withCtx"])((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(j.modalTitle),1)]})),_:1},8,["currentItem","isNew","onEmitGetProducts"]),Object(o["createVNode"])(N,{ref:"deleteModal",currentItem:j.currentProduct,onEmitHide:t[2]||(t[2]=function(e){return O.showDeleteModal(!1)}),onDeleteItem:O.deleteProduct},{title:Object(o["withCtx"])((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(j.modalTitle),1)]})),_:1},8,["currentItem","onDeleteItem"]),Object(o["createElementVNode"])("div",h,[Object(o["createVNode"])(V,{class:"pagination-inner",paginations:j.pagination,onEmitGetProducts:O.getProducts},null,8,["paginations","onEmitGetProducts"])])])}c("99af");var O=c("7b17"),f=(c("a4d3"),c("e01a"),{class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","data-bs-backdrop":"static","aria-labelledby":"productModalLabel","aria-hidden":"true"}),g={class:"modal-dialog modal-lg",role:"document"},N={class:"modal-content border-0"},V={class:"modal-header"},E={class:"modal-title",id:"productModalLabel"},v={class:"modal-body"},P={class:"row"},M={class:"col-sm-4"},w={class:"form-group"},y=Object(o["createElementVNode"])("label",{for:"image"},"輸入圖片網址",-1),k={class:"form-group"},x={for:"customFile"},C=Object(o["createTextVNode"])(" 或 上傳圖片 "),D={key:0,class:"fas fa-spinner fa-pulse"},T=["src"],$={class:"col-sm-8"},_={class:"form-group"},B=Object(o["createElementVNode"])("label",{for:"title"},"標題",-1),I={class:"form-row"},U={class:"form-group col-md-6"},S=Object(o["createElementVNode"])("label",{for:"category"},"分類",-1),L={class:"form-group col-md-6"},F=Object(o["createElementVNode"])("label",{for:"price"},"單位",-1),G={class:"form-row"},z={class:"form-group col-md-6"},H=Object(o["createElementVNode"])("label",{for:"origin_price"},"原價",-1),J={class:"form-group col-md-6"},A=Object(o["createElementVNode"])("label",{for:"price"},"售價",-1),q=Object(o["createElementVNode"])("hr",null,null,-1),K={class:"form-group"},Q=Object(o["createElementVNode"])("label",{for:"description"},"產品描述",-1),R={class:"form-group"},W=Object(o["createElementVNode"])("label",{for:"content"},"說明內容",-1),X={class:"form-group"},Y={class:"form-check"},Z=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),ee={class:"modal-footer"};function te(e,t,c,n,r,l){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",f,[Object(o["createElementVNode"])("div",g,[Object(o["createElementVNode"])("div",N,[Object(o["createElementVNode"])("div",V,[Object(o["createElementVNode"])("h5",E,[Object(o["renderSlot"])(e.$slots,"title")]),Object(o["createElementVNode"])("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=function(){return l.hideModel&&l.hideModel.apply(l,arguments)}),"aria-label":"Close"})]),Object(o["createElementVNode"])("div",v,[Object(o["createElementVNode"])("div",P,[Object(o["createElementVNode"])("div",M,[Object(o["createElementVNode"])("div",w,[y,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":t[1]||(t[1]=function(e){return r.currentProduct.imageUrl=e}),placeholder:"請輸入圖片連結"},null,512),[[o["vModelText"],r.currentProduct.imageUrl]])]),Object(o["createElementVNode"])("div",k,[Object(o["createElementVNode"])("label",x,[C,r.status.fileUploading?(Object(o["openBlock"])(),Object(o["createElementBlock"])("i",D)):Object(o["createCommentVNode"])("",!0)]),Object(o["createElementVNode"])("input",{type:"file",id:"customFile",class:"form-control",ref:"files",onChange:t[2]||(t[2]=function(){return l.uploadFile&&l.uploadFile.apply(l,arguments)})},null,544)]),Object(o["createElementVNode"])("img",{class:"img-thumbnail",alt:"商品圖片",src:r.currentProduct.imageUrl},null,8,T)]),Object(o["createElementVNode"])("div",$,[Object(o["createElementVNode"])("div",_,[B,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[3]||(t[3]=function(e){return r.currentProduct.title=e}),placeholder:"請輸入標題"},null,512),[[o["vModelText"],r.currentProduct.title]])]),Object(o["createElementVNode"])("div",I,[Object(o["createElementVNode"])("div",U,[S,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"text",class:"form-control",id:"category","onUpdate:modelValue":t[4]||(t[4]=function(e){return r.currentProduct.category=e}),placeholder:"請輸入分類"},null,512),[[o["vModelText"],r.currentProduct.category]])]),Object(o["createElementVNode"])("div",L,[F,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"unit",class:"form-control",id:"unit","onUpdate:modelValue":t[5]||(t[5]=function(e){return r.currentProduct.unit=e}),placeholder:"請輸入單位"},null,512),[[o["vModelText"],r.currentProduct.unit]])])]),Object(o["createElementVNode"])("div",G,[Object(o["createElementVNode"])("div",z,[H,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"number",class:"form-control",id:"origin_price","onUpdate:modelValue":t[6]||(t[6]=function(e){return r.currentProduct.origin_price=e}),placeholder:"請輸入原價"},null,512),[[o["vModelText"],r.currentProduct.origin_price]])]),Object(o["createElementVNode"])("div",J,[A,Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":t[7]||(t[7]=function(e){return r.currentProduct.price=e}),placeholder:"請輸入售價"},null,512),[[o["vModelText"],r.currentProduct.price]])])]),q,Object(o["createElementVNode"])("div",K,[Q,Object(o["withDirectives"])(Object(o["createElementVNode"])("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":t[8]||(t[8]=function(e){return r.currentProduct.description=e}),placeholder:"請輸入產品描述"},null,512),[[o["vModelText"],r.currentProduct.description]])]),Object(o["createElementVNode"])("div",R,[W,Object(o["withDirectives"])(Object(o["createElementVNode"])("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":t[9]||(t[9]=function(e){return r.currentProduct.content=e}),placeholder:"請輸入產品說明內容"},null,512),[[o["vModelText"],r.currentProduct.content]])]),Object(o["createElementVNode"])("div",X,[Object(o["createElementVNode"])("div",Y,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"checkbox",id:"is_enabled","onUpdate:modelValue":t[10]||(t[10]=function(e){return r.currentProduct.is_enabled=e}),"true-value":1,"false-value":0},null,512),[[o["vModelCheckbox"],r.currentProduct.is_enabled]]),Z])])])])]),Object(o["createElementVNode"])("div",ee,[Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[11]||(t[11]=function(){return l.hideModel&&l.hideModel.apply(l,arguments)})},"取消"),Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-success",onClick:t[12]||(t[12]=function(){return l.updateProduct&&l.updateProduct.apply(l,arguments)})},"確認")])])])])}var ce={props:{currentItem:Object,isNew:Boolean},data:function(){return{currentProduct:{},status:{fileUploading:!1}}},methods:{hideModel:function(){this.$emit("emit-hide"),this.$refs.files.value=""},getProducts:function(){this.$emit("emit-getProducts")},updateProduct:function(){var e,t,c=this;this.isNew?(e="".concat("https://vue-course-api.hexschool.io","/api/").concat("wenrong","/admin/product"),t="post"):(e="".concat("https://vue-course-api.hexschool.io","/api/").concat("wenrong","/admin/product/").concat(this.currentItem.id),t="put"),this.$http[t](e,{data:this.currentProduct}).then((function(e){e.data.success&&(c.hideModel(),c.$store.dispatch("alertModules/updateMessage",{message:e.data.message,status:"success"}),c.getProducts())}))},uploadFile:function(){var e=this,t=this.$refs.files.files[0],c=new FormData;c.append("file-to-upload",t);var o="".concat("https://vue-course-api.hexschool.io","/api/").concat("wenrong","/admin/upload");this.status.fileUploading=!0,this.$http.post(o,c,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.status.fileUploading=!1,t.data.success?e.currentProduct.imageUrl=t.data.imageUrl:(e.$store.dispatch("alertModules/updateMessage",{message:t.data.message,status:"danger"}),e.$refs.files.value="")}))}},watch:{currentItem:function(){this.currentProduct=this.currentItem}}},oe=c("6b0d"),ne=c.n(oe);const re=ne()(ce,[["render",te]]);var le=re,ae=c("d58b"),de=c("1799"),ie={components:{productModal:le,deleteModal:ae["a"],pagination:de["a"]},data:function(){return{products:[],pagination:{},currentProduct:{},isNew:!1,modalTitle:"",productModal:"",deleteModal:"",isLoading:!1}},methods:{getProducts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=this;t.isLoading=!0;var c="".concat("https://vue-course-api.hexschool.io","/api/").concat("wenrong","/products?page=").concat(e);this.$http.get(c).then((function(e){t.isLoading=!1,t.products=e.data.products,t.pagination=e.data.pagination}))},showProductModal:function(e){e?this.productModal.show():this.productModal.hide()},showDeleteModal:function(e){e?this.deleteModal.show():this.deleteModal.hide()},createProduct:function(){this.currentProduct={},this.showProductModal(!0),this.modalTitle="新增產品",this.isNew=!0},editProduct:function(e){this.currentProduct=Object.assign({},e),this.showProductModal(!0),this.modalTitle="編輯產品",this.isNew=!1},showDeleteProductModal:function(e){this.showDeleteModal(!0),this.currentProduct=e,this.modalTitle="刪除產品"},deleteProduct:function(e){var t=this,c="".concat("https://vue-course-api.hexschool.io","/api/").concat("wenrong","/admin/product/").concat(e);this.$http["delete"](c).then((function(e){e.data.success&&(t.showDeleteModal(!1),t.getProducts())}))}},created:function(){this.getProducts()},mounted:function(){this.productModal=new O["a"](this.$refs.productModal.$el),this.deleteModal=new O["a"](this.$refs.deleteModal.$el)}};c("3c21");const se=ne()(ie,[["render",j],["__scopeId","data-v-20def720"]]);t["default"]=se},"99af":function(e,t,c){"use strict";var o=c("23e7"),n=c("d039"),r=c("e8b5"),l=c("861d"),a=c("7b0b"),d=c("07fa"),i=c("8418"),s=c("65f0"),u=c("1dde"),b=c("b622"),m=c("2d00"),p=b("isConcatSpreadable"),h=9007199254740991,j="Maximum allowed index exceeded",O=m>=51||!n((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),f=u("concat"),g=function(e){if(!l(e))return!1;var t=e[p];return void 0!==t?!!t:r(e)},N=!O||!f;o({target:"Array",proto:!0,forced:N},{concat:function(e){var t,c,o,n,r,l=a(this),u=s(l,0),b=0;for(t=-1,o=arguments.length;t<o;t++)if(r=-1===t?l:arguments[t],g(r)){if(n=d(r),b+n>h)throw TypeError(j);for(c=0;c<n;c++,b++)c in r&&i(u,b,r[c])}else{if(b>=h)throw TypeError(j);i(u,b++,r)}return u.length=b,u}})},d58b:function(e,t,c){"use strict";var o=c("7a23"),n={class:"modal fade",id:"deleteProductModal",tabindex:"-1",role:"dialog","data-bs-backdrop":"static","aria-labelledby":"deleteModalLabel","aria-hidden":"true"},r={class:"modal-dialog",role:"document"},l={class:"modal-content border-0"},a={class:"modal-header"},d={class:"modal-title",id:"deleteModalLabel"},i={class:"modal-body"},s=Object(o["createTextVNode"])(" 確定刪除「"),u={style:{color:"red"}},b=Object(o["createTextVNode"])("」？ "),m={class:"modal-footer"};function p(e,t,c,p,h,j){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",n,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("div",l,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("h5",d,[Object(o["renderSlot"])(e.$slots,"title")]),Object(o["createElementVNode"])("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=function(){return j.hideModel&&j.hideModel.apply(j,arguments)}),"data-dismiss":"modal","aria-label":"Close"})]),Object(o["createElementVNode"])("div",i,[s,Object(o["createElementVNode"])("span",u,Object(o["toDisplayString"])(c.currentItem.title),1),b]),Object(o["createElementVNode"])("div",m,[Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[1]||(t[1]=function(){return j.hideModel&&j.hideModel.apply(j,arguments)})},"取消"),Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-danger",onClick:t[2]||(t[2]=function(e){return j.deleteItem(c.currentItem.id)})},"確認")])])])])}var h={props:{currentItem:Object},methods:{hideModel:function(){this.$emit("emit-hide")},deleteItem:function(e){this.$emit("deleteItem",e)}}},j=c("6b0d"),O=c.n(j);const f=O()(h,[["render",p]]);t["a"]=f}}]);
//# sourceMappingURL=chunk-294d2b42.794421e1.js.map