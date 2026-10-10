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