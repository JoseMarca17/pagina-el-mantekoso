"use client";

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  tag: string;
  stock: number;
  unidad: string;
  minStock: number;
  vence: string; // formato YYYY-MM-DD
  estante: string;
  costoUnitario: number;
  lote: string;
  ingreso: string; // Descripción del último ingreso
}

export interface Categoria {
  id: string;
  icon: string;
}

export interface Ubicacion {
  id: string;
  nombre: string;
}

export interface KardexRegistro {
  id: number;
  tipo: 'Entrada' | 'Salida' | 'Ajuste';
  productoId: number;
  productoNombre: string;
  cantidad: number;
  unidad: string;
  motivo: string;
  fecha: string; // formato YYYY-MM-DD o DD/MM/YYYY
  hora: string;
  lote: string;
  responsable: string;
}

export interface InventarioDB {
  productos: Producto[];
  kardex: KardexRegistro[];
}

export const CATEGORIAS: Categoria[] = [
  { id: 'Insumos', icon: '📦' },
  { id: 'Tortas', icon: '🎂' },
  { id: 'Masitas', icon: '🥐' },
  { id: 'Bebidas', icon: '☕' }
];

export const UBICACIONES: Ubicacion[] = [
  { id: 'frios-a3', nombre: 'Sector Fríos A-3' },
  { id: 'vitrina-t', nombre: 'Vitrina Frontal' },
  { id: 'vitrina-m', nombre: 'Vitrina Exhibidora' },
  { id: 'secos-b1', nombre: 'Estante Secos B-1' },
  { id: 'secos-b2', nombre: 'Estante Secos B-2' },
  { id: 'frigobar-1', nombre: 'Frigobar 1' },
  { id: 'frigobar-2', nombre: 'Frigobar 2' }
];

export const PRODUCTOS_INICIALES: Producto[] = [
  {
    id: 1,
    nombre: "Mantequilla de Campo Pura",
    categoria: "Insumos",
    tag: "INSUMO BASE",
    stock: 18,
    unidad: "Kg",
    minStock: 30,
    vence: "2026-06-28",
    estante: "Sector Fríos A-3",
    costoUnitario: 35.0,
    lote: "L-MANT01",
    ingreso: "15/05 (50 Kg)"
  },
  {
    id: 2,
    nombre: "Torta Tres Leches",
    categoria: "Tortas",
    tag: "REPOSTERÍA",
    stock: 5,
    unidad: "Unidades",
    minStock: 8,
    vence: "2026-06-10",
    estante: "Vitrina Frontal",
    costoUnitario: 80.0,
    lote: "L-3LECH02",
    ingreso: "01/06 (10 Uds)"
  },
  {
    id: 3,
    nombre: "Cuñapé Abizcochado Bolsa",
    categoria: "Masitas",
    tag: "PROD. LOCAL",
    stock: 12,
    unidad: "Bolsas",
    minStock: 25,
    vence: "2026-07-15",
    estante: "Pasillo Central",
    costoUnitario: 12.0,
    lote: "L-CUNA03",
    ingreso: "20/05 (100 Uds)"
  },
  {
    id: 4,
    nombre: "Coca Cola 500ml",
    categoria: "Bebidas",
    tag: "BEBIDA FRÍA",
    stock: 45,
    unidad: "Unidades",
    minStock: 24,
    vence: "2026-12-10",
    estante: "Frigobar 2",
    costoUnitario: 4.5,
    lote: "L-COCA04",
    ingreso: "28/05 (100 Uds)"
  },
  {
    id: 5,
    nombre: "Harina de Trigo 0000",
    categoria: "Insumos",
    tag: "INSUMO BASE",
    stock: 120,
    unidad: "Kg",
    minStock: 80,
    vence: "2026-10-15",
    estante: "Estante Secos B-1",
    costoUnitario: 8.0,
    lote: "L-HARI05",
    ingreso: "10/05 (200 Kg)"
  },
  {
    id: 6,
    nombre: "Azúcar Refinada",
    categoria: "Insumos",
    tag: "INSUMO BASE",
    stock: 15,
    unidad: "Kg",
    minStock: 40,
    vence: "2026-11-20",
    estante: "Estante Secos B-1",
    costoUnitario: 7.0,
    lote: "L-AZUC06",
    ingreso: "12/05 (100 Kg)"
  },
  {
    id: 7,
    nombre: "Crema de Leche PIL",
    categoria: "Insumos",
    tag: "REFRIGERADO",
    stock: 8,
    unidad: "Lts",
    minStock: 15,
    vence: "2026-06-09", // vence pronto (hoy es 2026-06-07)
    estante: "Sector Fríos A-3",
    costoUnitario: 22.0,
    lote: "L-CREM07",
    ingreso: "01/06 (20 Lts)"
  },
  {
    id: 8,
    nombre: "Selva Negra Familiar",
    categoria: "Tortas",
    tag: "REPOSTERÍA",
    stock: 4,
    unidad: "Unidades",
    minStock: 3,
    vence: "2026-06-08", // vence en 1 día
    estante: "Vitrina Frontal",
    costoUnitario: 95.0,
    lote: "L-SELV08",
    ingreso: "05/06 (5 Uds)"
  },
  {
    id: 9,
    nombre: "Tarta de Frutilla Mediana",
    categoria: "Tortas",
    tag: "REPOSTERÍA",
    stock: 2,
    unidad: "Unidades",
    minStock: 4,
    vence: "2026-06-11", // vence pronto
    estante: "Vitrina Frontal",
    costoUnitario: 65.0,
    lote: "L-FRUT09",
    ingreso: "06/06 (4 Uds)"
  },
  {
    id: 10,
    nombre: "Croissant de Mantequilla",
    categoria: "Masitas",
    tag: "PROD. LOCAL",
    stock: 8,
    unidad: "Unidades",
    minStock: 30,
    vence: "2026-06-08", // vence pronto
    estante: "Vitrina Exhibidora",
    costoUnitario: 5.0,
    lote: "L-CROI10",
    ingreso: "07/06 (50 Uds)"
  },
  {
    id: 11,
    nombre: "Alfajores Dulce de Leche",
    categoria: "Masitas",
    tag: "PROD. LOCAL",
    stock: 42,
    unidad: "Unidades",
    minStock: 20,
    vence: "2026-06-22",
    estante: "Vitrina Exhibidora",
    costoUnitario: 3.5,
    lote: "L-ALFA11",
    ingreso: "02/06 (60 Uds)"
  },
  {
    id: 12,
    nombre: "Fanta Naranja 500ml",
    categoria: "Bebidas",
    tag: "BEBIDA FRÍA",
    stock: 18,
    unidad: "Unidades",
    minStock: 20,
    vence: "2027-01-18",
    estante: "Frigobar 2",
    costoUnitario: 4.5,
    lote: "L-FANT12",
    ingreso: "28/05 (50 Uds)"
  },
  {
    id: 13,
    nombre: "Agua Mineral Sin Gas",
    categoria: "Bebidas",
    tag: "BEBIDA FRÍA",
    stock: 50,
    unidad: "Unidades",
    minStock: 24,
    vence: "2027-03-30",
    estante: "Frigobar 1",
    costoUnitario: 3.0,
    lote: "L-AGUA13",
    ingreso: "30/05 (100 Uds)"
  },
  {
    id: 14,
    nombre: "Café Molido Yungas 250g",
    categoria: "Bebidas",
    tag: "CAFÉ",
    stock: 7,
    unidad: "Unidades",
    minStock: 15,
    vence: "2027-03-12",
    estante: "Estante Secos B-2",
    costoUnitario: 28.0,
    lote: "L-CAFE14",
    ingreso: "15/05 (20 Uds)"
  },
  {
    id: 15,
    nombre: "Levadura Seca en Polvo",
    categoria: "Insumos",
    tag: "INSUMO BASE",
    stock: 4,
    unidad: "Kg",
    minStock: 10,
    vence: "2026-08-30",
    estante: "Estante Secos B-2",
    costoUnitario: 45.0,
    lote: "L-LEVA15",
    ingreso: "05/05 (10 Kg)"
  },
  {
    id: 16,
    nombre: "Esencia de Vainilla 1L",
    categoria: "Insumos",
    tag: "INSUMO BASE",
    stock: 9,
    unidad: "Lts",
    minStock: 5,
    vence: "2027-12-18",
    estante: "Estante Secos B-2",
    costoUnitario: 55.0,
    lote: "L-VAIN16",
    ingreso: "10/04 (10 Lts)"
  }
];

export const KARDEX_INICIAL: KardexRegistro[] = [
  {
    id: 1,
    tipo: 'Entrada',
    productoId: 1,
    productoNombre: "Mantequilla de Campo Pura",
    cantidad: 50,
    unidad: "Kg",
    motivo: "Abastecimiento regular",
    fecha: "2026-06-05",
    hora: "08:30",
    lote: "L-MANT01",
    responsable: "Andrés Cruz"
  },
  {
    id: 2,
    tipo: 'Entrada',
    productoId: 5,
    productoNombre: "Harina de Trigo 0000",
    cantidad: 200,
    unidad: "Kg",
    motivo: "Compra mensual",
    fecha: "2026-06-05",
    hora: "09:00",
    lote: "L-HARI05",
    responsable: "Andrés Cruz"
  },
  {
    id: 3,
    tipo: 'Salida',
    productoId: 6,
    productoNombre: "Azúcar Refinada",
    cantidad: 10,
    unidad: "Kg",
    motivo: "Consumo interno repostería",
    fecha: "2026-06-06",
    hora: "14:15",
    lote: "L-AZUC06",
    responsable: "Andrés Cruz"
  },
  {
    id: 4,
    tipo: 'Entrada',
    productoId: 7,
    productoNombre: "Crema de Leche PIL",
    cantidad: 20,
    unidad: "Lts",
    motivo: "Pedido especial pasteles",
    fecha: "2026-06-06",
    hora: "10:45",
    lote: "L-CREM07",
    responsable: "Andrés Cruz"
  },
  {
    id: 5,
    tipo: 'Ajuste',
    productoId: 2,
    productoNombre: "Torta Tres Leches",
    cantidad: -2,
    unidad: "Unidades",
    motivo: "Merma: Daño físico en vitrina",
    fecha: "2026-06-06",
    hora: "16:00",
    lote: "L-3LECH02",
    responsable: "Andrés Cruz"
  },
  {
    id: 6,
    tipo: 'Entrada',
    productoId: 10,
    productoNombre: "Croissant de Mantequilla",
    cantidad: 50,
    unidad: "Unidades",
    motivo: "Ingreso producción diaria",
    fecha: "2026-06-07",
    hora: "07:15",
    lote: "L-CROI10",
    responsable: "Andrés Cruz"
  }
];

const LOCAL_STORAGE_KEY = "el_mantekoso_inventario_db";

export function loadDatabase(): InventarioDB {
  if (typeof window === "undefined") {
    return { productos: PRODUCTOS_INICIALES, kardex: KARDEX_INICIAL };
  }
  
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error al cargar la base de datos de localStorage", e);
  }
  
  // Si no hay datos, inicializamos y guardamos
  const db = { productos: PRODUCTOS_INICIALES, kardex: KARDEX_INICIAL };
  saveDatabase(db);
  return db;
}

export function saveDatabase(db: InventarioDB): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Error al guardar la base de datos en localStorage", e);
  }
}
