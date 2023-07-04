const form = document.getElementById("new-restaurant");
const nameInput = document.getElementById("name");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const table= document.getElementById('table-body')

window.addEventListener("DOMContentLoaded", async()=>{
  try{
    const response = await axios.get('http://localhost:3000/analytics/performance')
    response.data.forEach(restaurant => {
      const newRow = createTableRow(restaurant);
      table.appendChild(newRow);
    })
    // console.log(response)
  }catch(err){
    console.log(err);
  }
})

function createTableRow(restaurant) {
  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const totalCountCell = document.createElement("td");

  nameCell.textContent = restaurant.name;
  totalCountCell.textContent = restaurant.total_reviews;

  row.appendChild(nameCell);
  row.appendChild(totalCountCell);
  
  return row;
}

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  // e.preventDefault();
  const data = {
    name: nameInput.value,
    location: locationInput.value,
    description: descriptionInput.value,
  };
  try {
    const response = await axios.post('http://localhost:3000/analytics/add', data);
    console.log(response);
    
    nameInput.value = '';
    locationInput.value = '';
    descriptionInput.value = '';
  } catch (err) {
    console.log(err);
  }
}
