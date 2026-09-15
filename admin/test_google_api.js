const axios = require('axios');

async function test() {
  try {
    const res = await axios.get(`https://inputtools.google.com/request?text=mukhy&itc=mr-t-i0-und&num=5`);
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}
test();
