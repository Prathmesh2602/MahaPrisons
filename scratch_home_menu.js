async function updateHomeMenu() {
  try {
    const res = await fetch('http://localhost:5000/api/v1/menu');
    let menuItems = await res.json();

    const homeIndex = menuItems.findIndex(item => item.href === '/');
    if (homeIndex !== -1) {
      menuItems[homeIndex].children = [
        { label_en: 'Hero Section', label_mr: 'मुख्य विभाग', href: '/#hero' },
        { label_en: 'About Us', label_mr: 'आमच्याबद्दल', href: '/#about' },
        { label_en: 'Jail Insights', label_mr: 'कारागृह माहिती', href: '/#insights' },
        { label_en: 'Announcements', label_mr: 'घोषणा', href: '/#announcements' },
        { label_en: 'Holiday Calendar', label_mr: 'सुट्टीचे कॅलेंडर', href: '/#calendar' },
        { label_en: 'Photo Gallery', label_mr: 'फोटो गॅलरी', href: '/#gallery' },
        { label_en: 'Quick Services', label_mr: 'जलद सेवा', href: '/#services' },
      ];

      console.log('Updating menu...');
      const putRes = await fetch('http://localhost:5000/api/v1/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItems)
      });
      console.log('Success:', putRes.status);
    } else {
      console.log('Home menu not found');
    }
  } catch (err) {
    console.error('Error updating menu:', err.message);
  }
}

updateHomeMenu();
