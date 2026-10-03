// Service worker：让工具箱可安装、离线可用（仅在 https 或 localhost 下注册）
// 策略：页面、脚本、样式、数据一律"网络优先、离线时用缓存"——部分模块的 import 不带版本号，
//       若缓存优先，新旧模块可能混用导致导出不匹配；音频与图片（体积大、不会变）用"缓存优先"，
//       钢琴采样在第一次播放时缓存。
const CACHE = 'jc-toolbox-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const isMedia = /\.(mp3|ogg|wav|jpg|jpeg|png|gif|webp)$/i.test(url.pathname);
  if (isMedia) {
    event.respondWith(caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') cache.put(request, response.clone());
      return response;
    }));
    return;
  }
  const key = request.mode === 'navigate' ? './index.html' : request;
  event.respondWith(fetch(request)
    .then((response) => {
      if (response.ok && response.type === 'basic') { const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(key, copy)); }
      return response;
    })
    .catch(() => caches.match(key)));
});
