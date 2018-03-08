var CACHE_STATIC_NAME = 'Static-v1'; //每次更新都要改他 才會抓其他的檔案
var CACHE_DYNAMIC_NAME = 'Dynamic';
var CACHE_LIST = [
  //預設要放cache的東西
  '/',
  '/app.js',
  '/index.html',
  '/manifest.json',
  '/src/App.vue',
  '/src/main.js',
  '/src/assets/offline.jpg',
  '/src/components/HelloFromVux.vue',
  '/src/router/index.js'
]

//最一開始載入會先跑這邊
self.addEventListener('install',function(event){
  console.log('SW is installed !',event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function(cache){
      cache.addAll(CACHE_LIST)
    })
  )  
})

//
self.addEventListener('activate',function(event){
  console.log('SW is activate !',event)

  //清理舊的caches
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );

})

//讀取檔案(js css image)時處拉
self.addEventListener('fetch',function(event){
  //console.log('get fetch',event)

  //設定抓檔案式要抓cache還是server  
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          //cache 有的情況就先用cache的頁面
          return response;
        } else {
          //cache 沒的的頁面就先用網路資源
          return fetch(event.request)
            .then(function(res) {
              //然後再存到動態cache中
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              //cache沒存到 也沒有網路的話 
              return caches.open(CACHE_STATIC_NAME).then(function(cache){
                //就放 離線提示圖   不然瀏覽器離線畫面很醜
                return cache.match('/src/assets/offline.jpg')
              })
            });
        }
      })
  );



})
