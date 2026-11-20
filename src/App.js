import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);
  const numOfItems = items.length;

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    const confirmation = window.confirm("Are you sure you want to clear list?");
    if (confirmation) setItems([]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="container">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <Stats items={items} numOfItems={numOfItems} />

      <PackingList
        items={items}
        numOfItems={numOfItems}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
        onToggleItem={handleToggleItem}
      />
    </div>
  );
}

function Logo() {
  return (
    <div className="header-box">
      <div className="logo-box">
        <img src="/icons/logo-case.svg" alt="case" className="logo" />
      </div>
      <div>
        <h1 className="header">Khai's Travel Pack</h1>
        <p className="header-text">
          Everything you need for the trip, in one list.
        </p>
      </div>
    </div>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="margin-container">
      <form onSubmit={handleSubmit} className="form-box">
        <div className="input-container">
          <label className="label" htmlFor="description">
            What do you need to pack?
          </label>
          <input
            className="input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="e.g passport, charger ..."
          />
        </div>

        <div className="qty-box">
          <div>
            <label className="label" htmlFor="quantity">
              Qty
            </label>
            <select
              className="select"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="quantity"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button className="btn-add">
            <span>+</span>Add item
          </button>
        </div>
      </form>
    </div>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onClearList,
  onToggleItem,
  numOfItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  const allPacked = items.length > 0 && items.every((item) => item.packed);

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  if (!items.length) {
    return (
      <div className="empty-container">
        <div className="icon-box">
          <img src="/icons/case.svg" alt="case" className="icon" />
        </div>
        <p className="empty-text">Your list is empty</p>
        <p className="empty-subtext">
          Add your first item above to start packing
        </p>
      </div>
    );
  }

  return (
    <div className="margin-container list-container">
      <div className="packing-top">
        <div className="number-cont">
          <p className="number-text">Your items</p>
          <span className="number">{numOfItems}</span>
        </div>

        <div className="sort-container">
          <span className="sort">Sort</span>
          <select
            className="input-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="input">Input order</option>
            <option value="description">Description order</option>
            <option value="packed">Packed order</option>
          </select>
          <button className="btn-clear" onClick={onClearList}>
            <img src="/icons/trash.svg" alt="trash" className="clear-icon" />
            <span className="clear-text">Clear list</span>
          </button>
        </div>
      </div>
      <div className="packing-container">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            allPacked={allPacked}
          ></Item>
        ))}
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem, allPacked }) {
  return (
    <div className={`items-container ${item.packed ? "packed" : ""}`}>
      <div className="items-box">
        <input
          className={`item-check ${allPacked ? "all-packed" : ""}`}
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span className="item-num">&times;{item.quantity}</span>
        <span className="item-description">{item.description}</span>
      </div>
      <div>
        <button
          className="btn-delete"
          aria-label={`Remove ${item.description}`}
          onClick={() => onDeleteItem(item.id)}
        >
          <img src="/icons/x-mark.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

function Stats({ items, numOfItems }) {
  const numOfPacked = items.filter((item) => item.packed).length;
  const percent = Math.floor((numOfPacked / numOfItems) * 100);
  const allpacked = numOfPacked === numOfItems;

  if (!items.length) {
    return (
      <p className="empty">Start adding some items to your packing list.</p>
    );
  }

  return (
    <footer
      className={`margin-container ${allpacked ? "fully-packed" : "footer"}`}
    >
      <div className="footer-box">
        {allpacked ? (
          <div className="footer--icon-box">
            <img src="/icons/plane.svg" alt="plane" className="footer-icon" />
            <span className="footer-text">Packing complete. Safe travels!</span>
          </div>
        ) : (
          <p className="footer-text">
            You have {numOfItems} items on the list, you have packed{" "}
            {numOfPacked}
          </p>
        )}
        <p className="percentage">{percent}%</p>
      </div>
      <input
        className="progress-bar"
        type="range"
        min={0}
        max={numOfItems}
        value={numOfPacked}
        readOnly
        style={{ "--fill": `${percent}%` }}
      />
    </footer>
  );
}
