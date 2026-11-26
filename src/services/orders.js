import { collection, doc, onSnapshot, query, where, serverTimestamp, writeBatch, updateDoc} 
from 'firebase/firestore'
import { db } from '../firebase.js'
 
// One order per vendor in the cart, all in a single batch.
//async: can perform asynchronous operations. (await), also can return promise
export async function placeOrders(user, cart, details) { 
  //parameters: They are variables that receive information when the function is called.
  const byVendor = new Map() //Map stores information in key-value pairs, group items same vendor so one order each vendor
  for (const line of cart) {//every line in cart
    const lines = byVendor.get(line.item.vendorId) ?? [] //if no item of that vendor yet, [], if yes just retrieve that item
    byVendor.set(line.item.vendorId, [...lines, line])
    //stores the updated group back into the Map.
    //copies the existing items into a new array, then line adds the current cart item.
  }

  const batch = writeBatch(db)//create batch operation save multiple doc
  //db: firestore database

  for (const [vendorId, lines] of byVendor) { //what we map earlier, want id and line (cart item)
    const ref = doc(collection(db, 'orders')) // doc create new document reference, with reference of order collection, auto id
    batch.set(ref, { //ref: tells Firebase what data should be stored in that document.
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].item.vendorName, //get vendor name from first item of that vendor
      items: lines.map(({ item, qty }) => ({ itemId: item.id, name: item.name, price: 
item.price, qty })), //map() to transform the cart entries into a new array containing only the information we want to save
//extract item and qty
      total: lines.reduce((sum, { item, qty }) => sum + item.price * qty, 0),
      //reduce processes the array and accumulates the result into one value
      status: 'Received',
      createdAt: serverTimestamp(),
    })
  }
  await batch.commit() //only if succeed return //wait until firebase confirm succeed or error first before sends all the prepared write operations to Firestore.
}
//batch.set() prepares the order documents, while batch.commit() saves them to Firestore
 
export function subscribeToMyOrders(uid, onData, onError) {
  // TODO 3: const q = query(collection(db, 'orders'), where(...))  only this student's orders
  // Hint: the field is 'studentUid' and it must equal uid.
    const q = query(
        collection(db, 'orders'),
        where('studentUid', '==', uid)
    )
    //query() is a Firebase Firestore function: it allows us to specify which documents we want to retrieve from the database.
    //look inside order collection where only select documents where studentUid is equal to the current student's UID.
  return onSnapshot( //listens to real-time changes in Firestore.
    q, //Listen for changes to the documents that match q 
    (snapshot) => { //snapshot is a parameter that receives the data returned by Firestore whenever the query has an update.
      const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) //snapshot.docs.map() converts the documents into an array of orders.
      // newest first; sorted here because where() + orderBy() on another field needs an index
      //doc Contains the documents returned by Firestore.
      orders.sort((a, b) => (b.createdAt?.toMillis?.() ?? Date.now()) - (a.createdAt?.toMillis?.() ?? Date.now()))
      //sorts the orders by creation time, with the newest orders first
      //If createdAt exists, try accessing toMillis, If toMillis exists, call it, otherwise return undefined instead of throwing an error.
      //If the timestamp conversion returns null or undefined, use the current time instead.
      onData(orders) //passes that updated array to another function.
      //onData is a callback function passed into subscribeToMyOrders().
    },
    onError,// if error occur, call it
  )
}

// Update: change ONE field. The other fields of the order stay as they are.
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(doc(db, 'orders', orderId), { pickupTime })
}

// Delete: remove the whole document.
export function cancelOrder(orderId) {
   return updateDoc(doc(db, 'orders', orderId), {
    status: 'Cancelled'
  })
  //following stretch task, instead of delete the order, it will update the order as cancelled
}