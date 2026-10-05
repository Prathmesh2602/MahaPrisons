const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      resolve(e.message);
    });
  });
}

async function run() {
  console.log("Checking API:", await checkUrl('https://mahaprisons.onrender.com/api/v1/pages/home'));
  console.log("Checking Upload:", await checkUrl('https://mahaprisons.onrender.com/uploads/digital_india.png'));
  console.log("Checking Frontend Upload Proxy:", await checkUrl('https://mahaprisons-2qu2.onrender.com/uploads/digital_india.png'));
}
run();
