// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,  
  render: h => h(App)
}).$mount('#app-box')




if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
  console.log('SW is register!!!')
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});


function AddtoHomescreen(){
  if (deferredPrompt) {
    deferredPrompt.prompt(); //要求使用者將本PWA加入主畫面
    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);
      //判斷使用者選項
      if (choiceResult.outcome === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
      }
    });

    deferredPrompt = null;
  }
}

function AddNotification(){
  if ('Notification' in window){
    console.log('is support notification')
    //要求提醒權限
    Notification.requestPermission().then(function(){
      console.log(Notification.permission) //取得是否取得權限
      if(Notification.permission == 'granted'){
        let option = {
          body:'Hello World!',
          image: '/src/assets/offline.jpg'
        }
        new Notification('test app',option) //推播提醒
      }
    })
  }
}



export {AddtoHomescreen , AddNotification} //輸出這兩個含式到page