import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { pedidos } from './pedidos';

const color = {
  fondo: '#EFF4EF', blanco: '#FFFFFF', texto: '#142D27', verde: '#123D34',
  suave: '#4F685F', borde: '#D9E5DD', menta: '#DDEDE5', limon: '#E2F083',
  pendiente: '#F6ECCD', pendienteTexto: '#715217', rechazado: '#F8E8E6', rechazadoTexto: '#843C3C',
};

const filtros = ['Todos', 'Pendiente', 'Despachada', 'Rechazada'];
const coloresEstado = {
  Pendiente: [color.pendiente, color.pendienteTexto],
  Despachada: [color.menta, color.verde],
  Rechazada: [color.rechazado, color.rechazadoTexto],
};

const moneda = new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ', currencyDisplay: 'narrowSymbol' });
const importe = centavos => moneda.format(centavos / 100);

function TarjetaPedido({ pedido }) {
  const [fondo, texto] = coloresEstado[pedido.estado];
  const total = pedido.detalles.reduce((suma, detalle) => suma + detalle.cantidad * detalle.precio, 0);

  return (
    <View style={estilo.tarjeta}>
      <View style={estilo.fila}>
        <Text style={estilo.numero}>{pedido.numero}</Text>
        <Text style={[estilo.estado, { backgroundColor: fondo, color: texto }]}>{pedido.estado}</Text>
      </View>
      <Text accessibilityRole="header" style={estilo.cliente}>{pedido.cliente}</Text>
      <View style={estilo.detalles}>
        {pedido.detalles.map(detalle => (
          <View style={estilo.fila} key={detalle.codigo}>
            <Text style={estilo.detalleProducto}>{detalle.cantidad} × {detalle.nombre}</Text>
            <Text style={estilo.detallePrecio}>{importe(detalle.cantidad * detalle.precio)}</Text>
          </View>
        ))}
      </View>
      <View style={estilo.fila}>
        <Text style={estilo.detalleProducto}>Total del pedido</Text>
        <Text style={estilo.total}>{importe(total)}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [filtro, setFiltro] = useState('Todos');
  const visibles = filtro === 'Todos' ? pedidos : pedidos.filter(pedido => pedido.estado === filtro);

  return (
    <SafeAreaProvider style={estilo.base}>
      <SafeAreaView style={estilo.base}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={estilo.contenedor}>
          <View style={estilo.fila}>
            <View style={estilo.marca}>
              <Image source={require('./assets/surtido.png')} style={estilo.logo} />
              <Text style={estilo.marcaTexto}>Surtido</Text>
            </View>
            <Text style={estilo.demo}>Datos de ejemplo</Text>
          </View>
          <View style={estilo.cabecera}>
            <Text accessibilityRole="header" style={estilo.titulo}>Pedidos</Text>
            <Text style={estilo.descripcion}>Consulta los productos y el estado de cada pedido.</Text>
          </View>
          <View accessibilityLabel="Filtrar por estado" style={estilo.filtros}>
            {filtros.map(etiqueta => {
              const seleccionado = etiqueta === filtro;
              return (
                <Pressable
                  accessibilityRole="button" accessibilityState={{ selected: seleccionado }}
                  key={etiqueta} onPress={() => setFiltro(etiqueta)}
                  style={({ pressed }) => [
                    estilo.filtro, seleccionado && estilo.filtroActivo, pressed && estilo.pulsado,
                  ]}
                >
                  <Text style={[estilo.filtroTexto, seleccionado && estilo.filtroTextoActivo]}>{etiqueta}</Text>
                </Pressable>
              );
            })}
          </View>
          {visibles.map(pedido => <TarjetaPedido key={pedido.numero} pedido={pedido} />)}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const estilo = StyleSheet.create({
  base: { flex: 1, backgroundColor: color.fondo },
  contenedor: { width: '100%', maxWidth: 590, alignSelf: 'center', padding: 20, paddingBottom: 34, gap: 13 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  marca: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: { width: 37, height: 37, borderRadius: 10 },
  marcaTexto: { fontWeight: '800', fontSize: 19, color: color.texto },
  demo: { fontWeight: '700', fontSize: 11, color: color.verde, padding: 8, borderRadius: 10, backgroundColor: color.menta },
  cabecera: { padding: 22, borderRadius: 21, backgroundColor: color.verde, gap: 5 },
  titulo: { color: color.blanco, fontSize: 39, fontWeight: '800', letterSpacing: -1 },
  descripcion: { fontSize: 14, lineHeight: 20, color: '#E3EFE9' },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  filtro: { paddingHorizontal: 10, minHeight: 42, justifyContent: 'center', borderWidth: 1,
    borderColor: color.borde, borderRadius: 20, backgroundColor: color.blanco },
  filtroActivo: { backgroundColor: color.limon, borderColor: color.limon },
  filtroTexto: { fontSize: 12, fontWeight: '700', color: color.suave },
  filtroTextoActivo: { color: color.verde },
  pulsado: { opacity: 0.72 },
  tarjeta: { padding: 15, borderRadius: 15, borderWidth: 1,
    borderColor: color.borde, backgroundColor: color.blanco, gap: 7 },
  numero: { color: color.suave, fontWeight: '700', fontSize: 12 },
  estado: { paddingHorizontal: 9, paddingVertical: 5, fontWeight: '800',
    borderRadius: 12, fontSize: 11, overflow: 'hidden' },
  cliente: { fontSize: 18, fontWeight: '800', color: color.texto },
  detalles: { paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: color.borde, gap: 5 },
  detalleProducto: { flexShrink: 1, fontSize: 13, color: color.suave },
  detallePrecio: { fontSize: 13, fontWeight: '700', color: color.suave },
  total: { fontSize: 16, fontWeight: '800', color: color.verde },
});
