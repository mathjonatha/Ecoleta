function populateStates() {
  const stateSelect = document.querySelector("select[name=state]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => {
      return response.json();
    })
    .then((states) => {
      for (let stateID = 0; stateID < states.length; stateID++) {
        stateSelect.innerHTML += `<option value="${stateID + 1}">${
          states[stateID].nome
        }</option>`;
      }
    });
}

function getCities() {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("select[name=state]");

  const stateValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/distritos`
  )
    .then((response) => {
      return response.json();
    })
    .then((cities) => {
      for (let cityID = 0; cityID < cities.length; cityID++) {
        citySelect.innerHTML += `<option value="${cityID + 1}">${
          cities[cityID].nome
        }</option>`;
      }
      citySelect.disabled = false;
    });
}

populateStates();

document
  .querySelector("select[name=state]")
  .addEventListener("change", getCities);
