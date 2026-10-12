async function test() {
  const res = await fetch('http://localhost:5000/api/v1/pages/by-slug?slug=/');
  const data = await res.json();
  const block = data.contentBlocks.find(b => b.blockType === 'announcements_tabs');
  console.log(JSON.stringify(block, null, 2));
}

test();
