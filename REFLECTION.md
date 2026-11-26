# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   Building a UI imperatively requires the programmer to specify how the computer should perform each
   step to create or change the user interface while declarative UI only describes what the interface
   should look like, and React handles the necessary DOM updates.

2. Why must a component name start with a capital letter?
   React treats uppercase and lowercase JSX tags differently. Uppercase names refer to React
   components, while lowercase names are interpreted as built-in or custom HTML element tags.

3. What does a fragment <>...</> do, and why not just use a <div>?
   A fragment (<>...</>) groups multiple elements so they can be returned together without adding an extra DOM element. A <div> creates an additional DOM element, so a fragment is useful when a wrapper is unnecessary. <div> is suitable when need container for CSS styling, a layout or other attributes.

4. Name one benefit of splitting the UI into small components.
   One benefit of splitting the UI into small components is reusability. The same component can be
   reused for different content instead of rewriting the same UI code repeatedly, saving time and
   making debugging easier.

# Week 6 reflection

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.

File involved:
CheckoutForm.jsx
CartPage.jsx
services/orders.js
hooks/useMyOrders.js
OrdersPage.jsx

a. When click the Place order button, the CheckoutForm.jsx components calls the handlePlaceOrder() function in CartPage.jsx through the onPlaceOrder prop.
b. In CartPage.jsx, handlePlaceOrder() calls and awaits placeOrders(user, cart, details) from services/orders.js.
c. In services/orders.js, placeOrders() groups the cart items by vendor, prepares the order documents using writeBatch(), and saves them to Firestore using batch.commit().
d. After order is successfully saved, CartPage.jsx calls clearCart() to empty the cart and navigate ('/orders') to redirect to the order page.
e. In OrdersPage.jsx, the useMyOrders() custom hook from hooks/useMyOrders.js retrieves the orders and uses useEffect() to call subscribeToMyOrders() from services/orders.js, which listens for changes using Firestore onSnapshot().
f.When Firestore detects the new order, subscribeToMyOrders() in services/orders.js converts the documents into an array and calls onData(orders).
g. The callback in hooks/useMyOrders.js then calls setOrders(data) to update the orders state, causing OrdersPage.jsx to re-render and display the new order using orders.map().

setOrders() never call directly in CartPage.jsx because the Firestore listener automatically detects the new order and updates the state through the callback.

2. Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?

The orders collection is stored at the top level in Firestore to make it easier to manage and query orders from different students and vendors in one location. The system can retrieve a student's orders using studentUid without need to search through individual documents.

Storing only IDs may cause issues because the original order information might change if the vendor or menu item details are updated later. Therefore, the system copies the vendor name, item names and prices into each order to preserve the original order information. It also makes displaying order details easier because the system does not need to fetch vendor and menu information separately.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.

File:
services/vendors.js
MenuList.jsx
hooks/useLocalStorage.js

Personal Feature: spice-level badge and filter
a. The menu items are stored in the Firestore subcollection vendors/{vendorId}/menu/{itemId}, where each menu document contains a spiceLevel field. In services/vendors.js, uses this code:
collection(db, 'vendors', vendorId, 'menu')
that become the collection path.

b. In services/vendors.js, the following line filters the menu items based on the selected maximum spice level:
where('spiceLevel', '<=', maxSpice).

c. The spiceLevel field is read from each Firestore document using ...d.data()

snapshot.docs.map((d) => ({
id: d.id,
vendorId,
...d.data()
}))

d. The selected maxSpice value is passed from VendorPage.jsx through useVendor() hook in useVendor.js to subscribeToMenu() in services/vendors.js.

Stretch Task
Instead of deleting, keep a record: make Cancel set status: 'Cancelled' with updateDoc and 
hide cancelled orders. Which is better for the shop, delete or soft-cancel? 

File involved:
services/orders.js — replaced deleteDoc() with updateDoc() to set status: 'Cancelled'
OrdersPage.jsx — filtered out cancelled orders using orders.filter().

Soft-cancelling is better for the shop because it keeps a record of cancelled orders instead of permanently deleting them. This allows the shop to review past orders, track cancellations and keep complete order history. However, cancelled orders is hidden from the student's active orders list to indicate it already been canceled from the order list. 