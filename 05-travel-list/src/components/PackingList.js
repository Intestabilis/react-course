import { useState } from "react";
import { Item } from "./Item.js";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  // Not mutating original array and using a copy for sorting (derived state)
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description),
    );
  if (sortBy === "packed")
    sortedItems = items.toSorted((a, b) => +b.packed - a.packed);

  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}
