
self.addEventListener('install', (e) => {
    let installPromise = new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    e.waitUntil(installPromise);
    console.log("Promise installed");
});

self.addEventListener('activate', (e) => {
    let activatePromise = new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    e.waitUntil(activatePromise);
    console.log("Service worker activated");
});

self.addEventListener('fetch', (e) => {
    const url = e.request.url;
    if (url.endsWith = '/greet') {
        let headers = new Headers({ 'Content-Type': 'text/html' });
        let body = '<div><h1>Greetings!</h1></div>';
        let response = new Response(body, {headers});
        e.respondWith(response);
    }
});