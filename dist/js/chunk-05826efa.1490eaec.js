(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05826efa"],{a434:function(t,i,s){"use strict";var e=s("23e7"),a=s("23cb"),c=s("a691"),o=s("50c4"),r=s("7b0b"),n=s("65f0"),d=s("8418"),l=s("1dde"),u=s("ae40"),h=l("splice"),_=u("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,p=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";e({target:"Array",proto:!0,forced:!h||!_},{splice:function(t,i){var s,e,l,u,h,_,v=r(this),m=o(v.length),C=a(t,m),x=arguments.length;if(0===x?s=e=0:1===x?(s=0,e=m-C):(s=x-2,e=p(f(c(i),0),m-C)),m+s-e>b)throw TypeError(g);for(l=n(v,e),u=0;u<e;u++)h=C+u,h in v&&d(l,u,v[h]);if(l.length=e,s<e){for(u=C;u<m-e;u++)h=u+e,_=u+s,h in v?v[_]=v[h]:delete v[_];for(u=m;u>m-e+s;u--)delete v[u-1]}else if(s>e)for(u=m-e;u>C;u--)h=u+e-1,_=u+s-1,h in v?v[_]=v[h]:delete v[_];for(u=0;u<s;u++)v[u+C]=arguments[u+2];return v.length=m-e+s,l}})},a7c1:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"single df fxd-c"},[s("loading",{attrs:{loader:"dots",active:t.isLoading},on:{"update:active":function(i){t.isLoading=i}}}),s("div",{staticClass:"product df jc-sb"},[s("div",{staticClass:"product_img df jc-c ai-c"},[s("img",{attrs:{src:""+t.product.imageUrl[0],alt:""}})]),s("div",{staticClass:"product_detail"},[s("div",{},[s("div",[s("h2",[t._v(t._s(t.product.title))]),s("h4",[t._v("NT."+t._s(t.product.price))]),s("div",{staticClass:"size"},[s("label",{attrs:{for:""}},[t._v("容量:")]),s("button",{class:{click:t.sm_size},attrs:{type:"button"},on:{click:function(i){t.sm_size=!t.sm_size,t.bg_size=!1}}},[t._v("30 ml")]),s("button",{class:{click:t.bg_size},attrs:{type:"button"},on:{click:function(i){t.bg_size=!t.bg_size,t.sm_size=!1}}},[t._v("50 ml")])]),s("div",{staticClass:"quantity"},[s("button",{attrs:{type:"button",disabled:1===t.quantity},on:{click:function(i){t.quantity=t.quantity-1}}},[t._v("-")]),s("input",{attrs:{type:"text"},domProps:{value:t.quantity}}),s("button",{attrs:{type:"button"},on:{click:function(i){t.quantity=t.quantity+1}}},[t._v("+")])]),s("div",{staticClass:"product_btns df fxd-c ta-c"},[!1===t.sm_size&&!1===t.bg_size?s("span",{staticClass:"errormsg ta-l"},[t._v("您尚未勾選容量")]):t._e(),s("button",{staticClass:"addcart",attrs:{type:"button",disabled:!1===t.sm_size&&!1===t.bg_size},on:{click:function(i){return t.addToCart(t.product.id,t.quantity)}}},[t._v(" Add To Cart")]),s("button",{attrs:{type:"button"},on:{click:function(i){return t.addToWish(t.product)}}},[s("i",{staticClass:"far fa-heart"}),s("span",[t._v("Wish List")])]),s("button",{staticClass:"remove_wish",class:{show:t.remove_wish},attrs:{type:"button"},on:{click:function(i){return t.removeWish(t.product)}}},[s("i",{staticClass:"fas fa-heart"}),s("span",[t._v("Remove Wish List")])])])])]),s("div",{staticClass:"describe"},[s("ul",{staticClass:"df jc-sa ta-c",on:{click:t.clickLI}},[s("li",{staticClass:"df fxd-c",class:{border:t.decribe_box}},[s("span",{staticClass:"describe_tag"},[t._v("商品描述")]),s("span",{staticClass:"describe_tag"},[t._v("DESCRIPTION")])]),s("li",{staticClass:"df fxd-c",class:{border:t.notice_box}},[s("span",{staticClass:"notice_tag"},[t._v("注意事項")]),s("span",{staticClass:"notice_tag"},[t._v("Notice")])])]),s("div",{staticClass:"describe_content"},[t.decribe_box?s("p",[t._v(t._s(t.product.content))]):t._e(),t.notice_box?s("p",[t._v(t._s(t.product.description))]):t._e()])])])]),s("div",{staticClass:"related container df fxd-c ai-fs"},[s("h3",{staticClass:"ta-c"},[t._v("More Look")]),s("div",{staticClass:"related_items df jc-sb ai-c fxw-w"},t._l(t.relatedProducts,(function(i){return s("div",{key:i.id,staticClass:"related_item",on:{click:function(i){t.getSingleProduct(),t.getProducts()}}},[s("div",{staticClass:"item-header"},[s("router-link",{attrs:{to:"/product/"+i.id}},[s("img",{staticClass:"df",attrs:{src:""+i.imageUrl[0],alt:""}}),s("button",{staticClass:"view_btn",attrs:{type:"button"}},[t._v("Quick View")])])],1),s("div",{staticClass:"item-body ta-c"},[s("router-link",{attrs:{to:"/product/"+i.id}},[s("h4",[t._v(t._s(i.title))])]),s("p",[t._v("NT."+t._s(i.price))])],1)])})),0)])],1)},a=[],c=(s("99af"),s("4160"),s("c975"),s("a434"),s("159b"),{data:function(){return{isLoading:!1,remove_wish:!1,notice_box:!1,decribe_box:!0,sm_size:!0,bg_size:!1,quantity:1,products:[],product:{imageUrl:[]},relatedProducts:[],idArray:[],wishlist:JSON.parse(localStorage.getItem("wishList"))||[],err_data:""}},methods:{getProducts:function(){var t=this;this.isLoading=!0;var i="".concat("https://course-ec-api.hexschool.io","/api/").concat("8e167757-8b00-4955-b28e-9494996b792d","/ec/products");this.axios.get(i).then((function(i){t.relatedProducts=[],t.products=i.data.data,t.products.forEach((function(i){i.category===t.product.category&&i.id!==t.product.id&&t.relatedProducts.push(i)}))})).catch((function(i){t.err_data=i.response.data.message,t.$bus.$emit("error",t.err_data),t.isLoading=!1}))},getSingleProduct:function(){var t=this;this.isLoading=!0;var i=this.$route.params.id,s="".concat("https://course-ec-api.hexschool.io","/api/").concat("8e167757-8b00-4955-b28e-9494996b792d","/ec/product/").concat(i);this.axios.get(s).then((function(i){t.isLoading=!1,t.product=i.data.data,t.wishlist.forEach((function(i){i.id===t.product.id&&(t.remove_wish=!0),t.idArray.push(i.id)}))})).catch((function(i){t.err_data=i.response.data.message,t.$bus.$emit("error",t.err_data),t.isLoading=!1}))},addToCart:function(t,i){this.$bus.$emit("addtocart",t,i)},addToWish:function(t){this.remove_wish=!0,this.wishlist.push(t),localStorage.setItem("wishList",JSON.stringify(this.wishlist))},removeWish:function(t){var i=this.idArray.indexOf(t.id);this.wishlist.splice(i,1),this.remove_wish=!1,localStorage.setItem("wishList",JSON.stringify(this.wishlist))},clickLI:function(t){"describe_tag"===t.target.className?(this.decribe_box=!0,this.notice_box=!1):"notice_tag"===t.target.className&&(this.notice_box=!0,this.decribe_box=!1)}},created:function(){this.getProducts(),this.getSingleProduct()}}),o=c,r=s("2877"),n=Object(r["a"])(o,e,a,!1,null,null,null);i["default"]=n.exports},c975:function(t,i,s){"use strict";var e=s("23e7"),a=s("4d64").indexOf,c=s("a640"),o=s("ae40"),r=[].indexOf,n=!!r&&1/[1].indexOf(1,-0)<0,d=c("indexOf"),l=o("indexOf",{ACCESSORS:!0,1:0});e({target:"Array",proto:!0,forced:n||!d||!l},{indexOf:function(t){return n?r.apply(this,arguments)||0:a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-05826efa.1490eaec.js.map