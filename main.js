
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js").then((registry) => {
        console.log("Serviceworker regisered");
    });
}