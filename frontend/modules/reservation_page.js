import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    const res = await fetch(config.backendEndpoint + "/reservations/");
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  const reservationTable = document.getElementById("reservation-table");
  reservations.map((key) => {
    const date = new Date(key.date);
    // console.log(key.time)
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-IN", options);
// console.log(formattedDate);
    const date1 = new Date(key.time);
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate1 = date1.toLocaleDateString("en-IN", dateOptions);

    // console.log(formattedDate)
    // console.log(formattedDate1)
    // console.log(key.date)

    const time = new Date(key.time);
   
    const formattedTime = time.toLocaleTimeString("en-IN");

    const newElem = document.createElement("tr");
    newElem.innerHTML = `
  <th>${key.id}</th>
  <td>${key.name}</td>
  <td>${key.adventureName}</td>
  <td>${key.person}</td>
  <td>${formattedDate}</td>
  <td>${key.price}</td>
  <td>${formattedDate1}, ${formattedTime}</td>
  <td>
    <div class="reservation-visit-button" id=${key.id}>
      <a href ="../detail/?adventure=${key.adventure}">Visit adventure</a>
    </div> 
  </td>
  `;
    reservationTable.append(newElem);
  });

  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };
