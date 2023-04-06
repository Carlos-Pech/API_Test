// // ignore_for_file: unnecessary_null_comparison

// import 'package:flutter/material.dart';
// import 'package:food_met/Dtos/Models/product_response_dto.dart';
// // import 'package:food_met/Dtos/providers/PlatoFuerte/mariscos_providers.dart';
// import 'package:food_met/Dtos/providers/cart2_providers.dart';
// import 'package:food_met/Dtos/providers/carrito_compras_providers.dart';
// import 'package:provider/provider.dart';

// class ListTileSelectExample extends StatelessWidget {
//   const ListTileSelectExample({super.key});

// // import 'package:flutter_popup_dialog/flutter_popup_dialog.dart';

//   void showPopup(BuildContext context, Products user) {
//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return Center(
//           child: Container(
//             width: 200.0,
//             height: 300.0,
//             decoration: BoxDecoration(
//               color: Colors.white,
//               borderRadius: BorderRadius.circular(20.0),
//               boxShadow: [
//                 BoxShadow(
//                   color: Colors.grey.withOpacity(0.5),
//                   spreadRadius: 5,
//                   blurRadius: 7,
//                   offset: const Offset(0, 3), // changes position of shadow
//                 ),
//               ],
//             ),
//             child: Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 const SizedBox(height: 10.0),
//                 Image.network(user.image,
//                     fit: BoxFit.cover, alignment: Alignment.topCenter),
//                 const SizedBox(height: 10.0),
//                 Text(user.name),
//                 const SizedBox(height: 10.0),
//                 Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceAround,
//                   children: [
//                     Column(children: [
//                       const Icon(Icons.price_change, color: Colors.green),
//                       Text(user.price.toString())
//                     ]),
//                     Column(
//                       children: [
//                         const Icon(Icons.timer, color: Colors.green),
//                         const SizedBox(height: 2),
//                         Text(
//                           '${user.time} min',
//                           style: const TextStyle(
//                               fontSize: 14.0,
//                               fontWeight: FontWeight.bold,
//                               color: Colors.black),
//                         )
//                       ],
//                     ),
//                     Column(
//                       children: [
//                         user.totalCalories >= 200
//                             ? const Icon(Icons.local_fire_department,
//                                 color: Colors.red)
//                             : Image.asset('assets/icons/low-calorie.png',
//                                 width: 28, height: 28),
//                         const SizedBox(height: 2),
//                         Text(
//                           '${user.totalCalories} Kcal',
//                           style: const TextStyle(
//                               fontSize: 14.0,
//                               fontWeight: FontWeight.bold,
//                               color: Colors.black),
//                         )
//                       ],
//                     ),
//                   ],
//                 ),
//                 ElevatedButton(
//                     onPressed: () => Navigator.pop(context),
//                     child: const Text('Cerrar')),
//               ],
//             ),
//           ),
//         );
//       },
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     final cartProvider = Provider.of<CartProvider>(context);

//     return Scaffold(
//       appBar: AppBar(
//         title: const Text("Carrito"),
//       ),
//       body: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           ElevatedButton.icon(
//             onPressed: () async {
//               await cartProvider.fetchProducts();
//             },
//             icon: const Icon(Icons.refresh),
//             label: const Text('Actualizar carrito'),
//           ),
//           Consumer<CartProvider>(
//             builder: (context, cartProvider, child) => cartProvider.isLoading
//                 ? const Center(
//                     child: CircularProgressIndicator(),
//                   )
//                 : Expanded(
//                     child: ListView.builder(
//                       itemCount: cartProvider.products.fold<int>(
//                         0,
//                         (previousValue, cart) =>
//                             previousValue + cart.products.length,
//                       ),
//                       itemBuilder: (context, index) {
//                         int runningTotal = 0;
//                         for (final cart in cartProvider.products) {
//                           final products = cart.products;
//                           if (index < runningTotal + products.length) {
//                             final product = products[index - runningTotal];
//                             return Card(
//                               // color: Colors.blue[700],
//                               child: Padding(
//                                 padding: const EdgeInsets.all(8.0),
//                                 child: Column(
//                                   mainAxisAlignment: MainAxisAlignment.center,
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Row(
//                                       mainAxisAlignment:
//                                           MainAxisAlignment.start,
//                                       crossAxisAlignment:
//                                           CrossAxisAlignment.center,
//                                       mainAxisSize: MainAxisSize.max,
//                                       children: [
//                                         Image.network(
//                                           product.image,
//                                           fit: BoxFit.cover,
//                                           errorBuilder: (BuildContext context,
//                                               Object exception,
//                                               StackTrace? stackTrace) {
//                                             return Image.asset(
//                                               'assets/images/opps2.jpg',
//                                               width: 100,
//                                               height: 100,
//                                             );
//                                           },
//                                         ),
//                                         const SizedBox(
//                                           width: 10,
//                                         ),
//                                         Expanded(
//                                           child: Column(
//                                             mainAxisAlignment:
//                                                 MainAxisAlignment.start,
//                                             crossAxisAlignment:
//                                                 CrossAxisAlignment.start,
//                                             children: [
//                                               Row(
//                                                 mainAxisAlignment:
//                                                     MainAxisAlignment
//                                                         .spaceBetween,
//                                                 children: [
//                                                   Text(
//                                                     product.name,
//                                                     style: const TextStyle(
//                                                         fontSize: 16,
//                                                         fontWeight:
//                                                             FontWeight.w500),
//                                                   ),
//                                                   IconButton(
//                                                     onPressed: () {
//                                                       final cartId = cart.id;
//                                                       final productId =
//                                                           product.id;
//                                                       if (cartId != null) {
//                                                         final cart =
//                                                             CarritoDeCompras();
//                                                         cart.eliminarCarrito(
//                                                             cartId, productId);
//                                                         debugPrint(
//                                                             product.name);
//                                                         ScaffoldMessenger.of(
//                                                                 context)
//                                                             .showSnackBar(
//                                                           const SnackBar(
//                                                             content: Text(
//                                                                 'Producto eliminado carrito'),
//                                                           ),
//                                                         );
//                                                       }
//                                                     },
//                                                     icon: const Icon(
//                                                       Icons.delete,
//                                                       color: Colors.black,
//                                                       size: 30,
//                                                     ),
//                                                   ),
//                                                 ],
//                                               ),
//                                               const SizedBox(
//                                                 height: 5,
//                                               ),
//                                               Text(
//                                                 product.price.toString(),
//                                                 style: const TextStyle(
//                                                     fontSize: 16,
//                                                     fontWeight:
//                                                         FontWeight.w500),
//                                               ),
//                                               const SizedBox(
//                                                 height: 5,
//                                               ),
//                                               Align(
//                                                 alignment:
//                                                     Alignment.centerRight,
//                                                 child: InkWell(
//                                                   onTap: () {},
//                                                   child: Container(
//                                                     height: 35,
//                                                     width: 100,
//                                                     decoration: BoxDecoration(
//                                                         color: Colors.green,
//                                                         borderRadius:
//                                                             BorderRadius
//                                                                 .circular(5)),
//                                                     child: Padding(
//                                                       padding:
//                                                           const EdgeInsets.all(
//                                                               4.0),
//                                                       child: Row(
//                                                         mainAxisAlignment:
//                                                             MainAxisAlignment
//                                                                 .spaceBetween,
//                                                         children: [
//                                                           // ignore: prefer_const_constructors
//                                                           // InkWell(
//                                                           //   child: const Icon(
//                                                           //     Icons.remove,
//                                                           //     color:
//                                                           //         Colors.white,
//                                                           //   ),
//                                                           // ),
//                                                           Text(
//                                                             'Calorias: ${product.totalCalories}',
//                                                             style:
//                                                                 const TextStyle(
//                                                               color:
//                                                                   Colors.white,
//                                                             ),
//                                                           ),

//                                                           // InkWell(
//                                                           //     onTap: () {
//                                                           //       int quantity =
//                                                           //           snapshot
//                                                           //               .data![
//                                                           //                   index]
//                                                           //               .quantity!;
//                                                           //       int price = snapshot
//                                                           //           .data![
//                                                           //               index]
//                                                           //           .initialPrice!;
//                                                           //       quantity++;
//                                                           //       int? newPrice =
//                                                           //           price *
//                                                           //               quantity;

//                                                           //       dbHelper!
//                                                           //           .updateQuantity(Cart(
//                                                           //               id: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .id!,
//                                                           //               productId: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .id!
//                                                           //                   .toString(),
//                                                           //               productName: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .productName!,
//                                                           //               initialPrice: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .initialPrice!,
//                                                           //               productPrice:
//                                                           //                   newPrice,
//                                                           //               quantity:
//                                                           //                   quantity,
//                                                           //               unitTag: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .unitTag
//                                                           //                   .toString(),
//                                                           //               image: snapshot
//                                                           //                   .data![
//                                                           //                       index]
//                                                           //                   .image
//                                                           //                   .toString()))
//                                                           //           .then(
//                                                           //               (value) {
//                                                           //         newPrice = 0;
//                                                           //         quantity = 0;
//                                                           //         cart.addTotalPrice(double.parse(snapshot
//                                                           //             .data![
//                                                           //                 index]
//                                                           //             .initialPrice!
//                                                           //             .toString()));
//                                                           //       }).onError((error,
//                                                           //               stackTrace) {
//                                                           //         print(error
//                                                           //             .toString());
//                                                           //       });
//                                                           //     },
//                                                           //     child: Icon(
//                                                           //       Icons.add,
//                                                           //       color: Colors
//                                                           //           .white,
//                                                           //     ),
//                                                           //     ),
//                                                         ],
//                                                       ),
//                                                     ),
//                                                   ),
//                                                 ),
//                                               )
//                                             ],
//                                           ),
//                                         )
//                                       ],
//                                     )
//                                   ],
//                                 ),
//                               ),
//                             );
//                           }
//                           runningTotal += products.length;
//                         }
//                         throw StateError('Invalid index');
//                       },
//                     ),
//                   ),
//           ),
//         ],
//       ),
//     );
//   }
// }



// // Card(
// //                               elevation: 0,
// //                               color: Colors.cyan,
// //                               child: Padding(
// //                                 padding: const EdgeInsets.all(8.0),
// //                                 child: ListTile(
// //                                   leading: Image.network(
// //                                     product.image,
// //                                     height: 90,
// //                                     width: 90,
// //                                   ),
// //                                   title: Padding(
// //                                     padding: EdgeInsets.all(8.0),
// //                                     child: Center(
// //                                       child: Text(
// //                                         product.name,
// //                                         style: const TextStyle(
// //                                             color: Colors.black,
// //                                             fontWeight: FontWeight.bold,
// //                                             fontSize: 18),
// //                                       ),
// //                                     ),
// //                                   ),
// //                                   trailing: Text(
// //                                     "${product.price}",
// //                                     style: const TextStyle(
// //                                         color: Colors.purple,
// //                                         fontWeight: FontWeight.bold,
// //                                         fontSize: 20),
// //                                   ),
// //                                 ),
// //                               ),
// //                             );
// // class ItemWidget extends StatelessWidget {
// //   final Item item;
// //   const ItemWidget({Key? key, required this.item}) : super(key: key);

// //   @override
// //   Widget build(BuildContext context) {
// //     return Padding(
// //       padding: const EdgeInsets.all(8.0),
// //       child: Card(
// //         elevation: 0,
// //         color: Colors.cyan,
// //         child: Padding(
// //           padding: const EdgeInsets.all(8.0),
// //           child: ListTile(
// //             leading: Image.network(
// //               item.image,
// //               height: 90,
// //               width: 90,
// //             ),
// //             title: Padding(
// //               padding: const EdgeInsets.all(8.0),
// //               child: Center(child: Text(item.name, style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 18))),
// //             ),
// //             subtitle: Center(child: Text(item.desc, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15))),
// //             trailing: Text(
// //               "${item.price}",
// //               style: TextStyle(color: Colors.purple, fontWeight: FontWeight.bold, fontSize: 20),
// //             ),
// //           ),
// //         ),
// //       ),
// //     );
// //   }
// // }

