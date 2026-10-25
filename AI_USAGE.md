# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): ChatGPT

- What I asked for: 
- I asked how to make bold for text in jsx at header
- I asked how to add logo image at the header

- What I kept, changed or rejected, and why: 
-There is two way to bold text which is using <strong> in jsx or use font-weight: bold in index,css
-Add logo image by putting logo in the project, and must import the image on the Header.jsx with correct path, then add in the Header function <img src={logo} alt="My logo" className="header-logo"/> then i remove the logo with campuseats text to replace it with the image. Then style the logo size in index.css with className header-logo. 

- One thing the AI got wrong and how I fixed it: 
-I'm choose to use font-weight in index.css because i can control the boldness based on different values (400, 500, or 800) compared to <strong> 
-The image path is wrong because the path depends on where the image location is so i adjust the path based on my folder and directory.


## Week 3
- Tool(s): ChatGpt

- What I asked for: 
1. Features of spice-level badge and filter (tbh I never done code for filtering, so in need help of AI)
2. To do part for lab 3
3. make changes on order details making it more like receipts

- What I kept, changed or rejected, and why:
1. The AI suggest me to make 3 changes of file (vendors.json, MenuList.jsx, MenuItemCard.jsx)
Vendors.json: add new property name "spiceLevel"
MenuList.jsx: add a controlled slider
MenuItemCard.jsx: display a badge showing each item's spicy level

useState being used to remember the maximum spice level selected by the user

2. 

a. The usage of cart.reduce for cart count 
const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

b. Show pickup time and total paid 

<span>Pickup Time</span>
<strong>{lastOrder.pickupTime}</strong>

<span>Total Paid</span>
<strong>RM {lastOrder.total.toFixed(2)}</strong>

c. when user click add button to add quantity of item
<button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>

d. uses of onRemove() for remove item on the checkout page

e. usage of cart.reduce to total price everything on cart
const total = cart.reduce(
  (sum, line) => sum + line.item.price * line.qty,
  0
)

3. using success icon, back to menu button 

- One thing the AI got wrong and how I fixed it:

1. It doesnt give the suitable color of slider that match the theme of my web, and i need to add a little space below the slider for organization purpose

2. To make sure only todo parts where change, i need to go through every code so no changes happened on unnecessary part

3. Mainly on color and style being fixed to meet my taste