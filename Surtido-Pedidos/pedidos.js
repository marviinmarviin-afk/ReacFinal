export const pedidos = [
  {
    numero: 'ORD-1003',
    cliente: 'Cafetería El Molino',
    estado: 'Pendiente',
    detalles: [
      { codigo: 'CAF-250', nombre: 'Café de altura', cantidad: 2, precio: 2850 },
      { codigo: 'CAC-100', nombre: 'Cacao en polvo', cantidad: 1, precio: 1525 },
    ],
  },
  {
    numero: 'ORD-1002',
    cliente: 'Tienda La Estación',
    estado: 'Despachada',
    detalles: [{ codigo: 'CAF-250', nombre: 'Café de altura', cantidad: 3, precio: 2850 }],
  },
  {
    numero: 'ORD-1001',
    cliente: 'Despensa Los Pinos',
    estado: 'Rechazada',
    detalles: [{ codigo: 'CAC-100', nombre: 'Cacao en polvo', cantidad: 2, precio: 1525 }],
  },
];
