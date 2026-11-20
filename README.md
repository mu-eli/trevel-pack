# Khai's Travel Pack

A packing-list app for trips, built with React. Add what you need to bring, tick items off as you pack, and watch the progress bar fill up.

[Travel Pack screenshot](public/screenshot.png)

## Features

- Add items with a description and quantity
- Mark items as packed or delete them
- Sort by input order, description, or packed status
- Clear the whole list (with confirmation)
- Live stats and a progress bar that turns green when everything is packed
- Empty-state screen when the list has no items
- Responsive layout for desktop, tablet and phone

## Built with

- React (`useState`, controlled forms, lifted and derived state)
- Plain CSS with custom properties (no UI library)
- Create React App

## Getting started

```bash
git clone https://github.com/mu-eli/travel-pack.git
cd travel-pack
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## What I practised

- Breaking a UI into components and passing data and handlers through props
- Keeping state in the right place and deriving values (counts, percentage, sorted list) instead of storing them
- Updating arrays immutably with `map`, `filter` and spread syntax
- Styling native inputs: a custom checkbox and a range input used as a progress bar
- Responsive layouts with CSS Grid, Flexbox and media queries

## Roadmap

- [ ] Edit an item's quantity after adding it
- [ ] Save the list to `localStorage` so it survives a page refresh

## Credits

Based on the Far Away project from Jonas Schmedtmann's _The Ultimate React Course_, rebuilt from memory with my own design.
