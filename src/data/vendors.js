const vendors = [
  {
    id: 'kafe-farouq',
    name: 'Kafe Mahallah Farouq',
    location: 'Mahallah Farouq, Block D',
    openHours: '8:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'far-1', name: 'Nasi Ayam Penyet', description: 'smashed fried chicken, soup, sambal, and 3 slices of cucumber', price: 6.00, category: 'Rice', 
available: true },
      { id: 'far-2', name: 'Nasi Ayam Gulai', description: 'coconut milk-based curry with chicken, and 3 slices of cucumber', price: 5.50, category: 
'Rice', available: true },
      { id: 'far-3', name: 'Teh O Ais Limau', description: 'Tea with lime', price: 2.5, category: 
'Drinks', available: false },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
      { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price: 
3, category: 'Drinks', available: true },
    ],
  },
]
 
export default vendors