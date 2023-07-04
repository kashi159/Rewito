const list = document.getElementById("restaurant-list");
let id;

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const restaurants = await axios.get(
      "http://localhost:3000/user/restaurant"
    );
    restaurants.data.forEach(async (restaurant) => {
      showRestaurant(restaurant);
    });
  } catch(err) {
    console.log(err);
}
});

function showRestaurant(restaurant) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.setAttribute("id", restaurant.id);
  const textNode = `${restaurant.name}, ${restaurant.location}, ${restaurant.description}`;
  li.appendChild(document.createTextNode(textNode));
  li.style.color = "black";

  var detailsBtn = document.createElement("button");
  detailsBtn.className = "btn btn-primary btn-sm float-end details";
  detailsBtn.appendChild(document.createTextNode("DETAILS"));
  li.appendChild(detailsBtn);
  list.appendChild(li);
}

list.addEventListener("click", showDetails);

function showDetails(e) {
  if (e.target.classList.contains("details")) {
    var li = e.target.parentElement;
    id = li.id;
    localStorage.setItem("id", id);
    window.location.href = "./restaurant.html";
  }
}
