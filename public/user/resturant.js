const details = document.getElementById("details");
const form = document.getElementById("review");
const myReview = document.getElementById("my-review");
const list = document.getElementById("reviews");
const msg = document.getElementById("msg");
const id = localStorage.getItem("id");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const detail = await axios.get(`http://localhost:3000/user/details/${id}`);
    showDetails(detail.data);
    console.log(detail);
  } catch (err) {
    console.log(err);
  }
});

function showDetails(restaurant) {
  const restaurantName = document.createElement("h2");
  restaurantName.textContent = restaurant.name;
  details.appendChild(restaurantName);

  const restaurantAddress = document.createElement("p");
  restaurantAddress.textContent = restaurant.location;
  details.appendChild(restaurantAddress);

  const restaurantDescription = document.createElement("p");
  restaurantDescription.textContent = restaurant.description;
  details.appendChild(restaurantDescription);

  const reviews = restaurant.reviews;
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const reviewElement = document.createElement("li");
    reviewElement.innerHTML = `<p>Anonymous User: ${review.review}</p>`;
    list.appendChild(reviewElement);
  }
}

function showReview(restaurant) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.setAttribute("id", restaurant.id);
  const textNode = `Anonymous User: ${restaurant.review}`;
  li.appendChild(document.createTextNode(textNode));
  list.appendChild(li);
}

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let review = {
    review: myReview.value,
  };

  //   console.log(review);
  if (myReview.value == "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter the feedback.";
  }
  try {
    const response = await axios.post(
      `http://localhost:3000/user/review/${id}`,
      review
    );
    console.log(response);
    showReview(response.data)
  } catch (err) {
    console.log(err);
  }
}
