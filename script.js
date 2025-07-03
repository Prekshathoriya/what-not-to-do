const form = document.getElementById("avoid-form");
const input = document.getElementById("avoid-input");
const list = document.getElementById("avoid-list");

let avoidItems = JSON.parse(localStorage.getItem("avoidItems")) || [];

// Render items on page load
avoidItems.forEach(item => renderItem(item));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    const newItem = { text, done: false };
    avoidItems.push(newItem);
    renderItem(newItem);
    saveItems();
    input.value = "";
  }
});

function renderItem(item) {
  const li = document.createElement("li");
  li.textContent = item.text;
  if (item.done) li.classList.add("checked");

  const btn = document.createElement("button");
  btn.textContent = "✓";
  btn.title = "I resisted this!";
  btn.addEventListener("click", () => {
    item.done = !item.done;
    li.classList.toggle("checked");
    saveItems();
  });

  li.appendChild(btn);
  list.appendChild(li);
}

function saveItems() {
  localStorage.setItem("avoidItems", JSON.stringify(avoidItems));
}
