async function test() {
  const res = await fetch('https://mahaprisons.onrender.com/api/v1/pages/by-slug?slug=/');
  const data = await res.json();
  const block = data.contentBlocks.find(b => b.blockType === 'announcements_tabs');
  console.log(JSON.stringify(block, null, 2));
}
test();
