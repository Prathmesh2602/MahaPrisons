const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const menus = await prisma.menu.findMany({
    include: {
      items: {
        orderBy: [
          { parentId: 'asc' },
          { order: 'asc' }
        ]
      }
    }
  });
  
  const pages = await prisma.pageNode.findMany({
    select: { slug: true, layoutType: true, title: true }
  });
  const pageMap = new Map();
  pages.forEach(p => pageMap.set(p.slug, p));

  const items = menus.find(m => m.name === 'main_navigation')?.items || [];
  
  // Build tree
  const tree = [];
  const itemMap = new Map();
  items.forEach(item => {
    item.children = [];
    itemMap.set(item.id, item);
  });
  
  items.forEach(item => {
    if (item.parentId && itemMap.has(item.parentId)) {
      itemMap.get(item.parentId).children.push(item);
    } else {
      tree.push(item);
    }
  });

  // Sort children by order
  const sortTree = (nodes) => {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach(n => sortTree(n.children));
  };
  sortTree(tree);

  const flatList = [];
  
  const processLink = (label, href, depth) => {
    let slug = href || '';
    if (slug.startsWith('/')) slug = slug.substring(1);
    if (slug === '') slug = '/';
    
    // Ignore hash links unless it's root
    if (slug.startsWith('#') && slug.length > 1) {
      slug = 'N/A';
    }

    let layout = 'N/A (No Page)';
    if (slug !== 'N/A') {
      const page = pageMap.get(slug);
      layout = page ? page.layoutType : 'N/A (No Page)';
    }

    flatList.push({
      label: label,
      slug: slug,
      layout: layout,
      depth
    });
  };

  const flatten = (nodes, depth = 0) => {
    nodes.forEach(node => {
      processLink(node.label_en, node.href, depth);
      
      // Check for mega menu groups
      if (node.groups && Array.isArray(node.groups)) {
        node.groups.forEach(group => {
          flatList.push({
            label: `[Group] ${group.title_en}`,
            slug: 'N/A',
            layout: 'Mega Menu Group',
            depth: depth + 1
          });
          if (group.links && Array.isArray(group.links)) {
            group.links.forEach(link => {
               processLink(link.label_en, link.href, depth + 2);
            });
          }
        });
      }

      flatten(node.children, depth + 1);
    });
  };
  flatten(tree);

  console.log(JSON.stringify(flatList, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
