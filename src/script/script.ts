import { Person } from "../types/Person";

window.onload = () => {
  getPersons();
};

const appendUsersToList = (persons: Person[]) => {
  const userList = document.getElementsByTagName("ul")[0];

  persons.forEach((person: Person) => {
    const listItem = document.createElement("li");
    listItem.classList.add("user");
    listItem.innerHTML = `
    <div class="user__box">
            <h3 class="user__box-name">${person.firstname} ${person.lastname}</h3>
            <div class="user__box-details details">
              <div class="details__info">
                <img
                  class="details__info-icon"
                  src="src/assets/images/mail.svg"
                  alt="mail"
                />
                <a class="details__info-text" href="mailto:${person.email}">${person.email}</a>
              </div>
              <div class="details__info">
                <img
                  class="details__info-icon"
                  src="src/assets/images/phone.svg"
                  alt="phone"
                />
                <a class="details__info-text" href="tel:${person.phone}">${person.phone}</a>
              </div>
              <div class="details__info">
                <img
                  class="details__info-icon"
                  src="src/assets/images/birthday.svg"
                  alt="birthday"
                />
                <span class="details__info-text">${person.birthday}</span>
              </div>
              <div class="details__info">
                <img
                  class="details__info-icon"
                  src="src/assets/images/gender.svg"
                  alt="gender"
                />
                <span class="details__info-text">${person.gender}</span>
              </div>
              <div class="details__info">
                <img
                  class="details__info-icon"
                  src="src/assets/images/website.svg"
                  alt="website"
                />
                <a class="details__info-text" target="_blank" href="${person.website}">${person.website}</a>
              </div>
            </div>
          </div>
    `;
    userList.appendChild(listItem);
  });
};

const clearList = () => {
  const listItems = document.getElementsByTagName("li");

  const listItemsArray = Array.from(listItems);

  listItemsArray.forEach((listItem) => {
    listItem?.parentNode?.removeChild(listItem);
  });

  appendUsersToList([]);
};

let quantity = 10;

function getPersons() {
  const BASE_URL = "https://fakerapi.it/api/v1/persons";
  let params = "";

  const startignDate: HTMLInputElement | any =
    document.getElementById("startingDate");
  const endDate: HTMLInputElement | any = document.getElementById("endDate");

  const startignDateValue = startignDate.value;
  const endDateValue = endDate.value;
  console.log(startignDateValue);

  if (startignDateValue && !endDateValue) {
    params = `&_birthday_start=${startignDateValue}`;
  } else if (endDateValue && !startignDateValue) {
    params = `&_birthday_end=${endDateValue}`;
  } else if (startignDateValue && endDateValue) {
    params = `&_birthday_start=${startignDateValue}&_birthday_end=${endDateValue}`;
  } else {
    params = "";
  }

  clearList();

  fetch(`${BASE_URL}?_quantity=${quantity}` + params)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      appendUsersToList(data.data);
      quantity = data.total;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
const handleFormSubmit = (event: Event) => {
  event.preventDefault();
  quantity = 10;
  getPersons();
};

const form: any = document.getElementById("dateForm");
form.addEventListener("submit", handleFormSubmit);

let scrolling = false;

window.addEventListener("scroll", function () {
  if (scrolling) {
    return;
  }
  scrolling = true;

  var scrollHeight = document.documentElement.scrollHeight;
  var scrollTop = window.scrollY;
  var windowHeight = window.innerHeight;

  if (scrollHeight - scrollTop - windowHeight < 20) {
    clearList();
    quantity = quantity + 10;
    getPersons();
  }

  setTimeout(function () {
    scrolling = false;
  }, 50);
});
