"use strict";

(function () {
  let modepidField;
  let nameField;
  let itemsInStockField;
  let topSpeedField;
  let modelYearField;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    modepidField = document.getElementById("mopedid");
    nameField = document.getElementById("name");
    itemsInStockField = document.getElementById("itemsInStock");
    topSpeedField = document.getElementById("topSpeed");
    modelYearField = document.getElementById("modelYear");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const moped = {
      mopedid: +modepidField.value,
      name: nameField.value,
      itemsInStock: +itemsInStockField.value,
      topSpeed: +topSpeedField.value,
      modelYear: +modelYearField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(moped),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };

      const data = await fetch("http://localhost:4000/api/mopeddb", options);
      const status = await data.json();

      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (error) {
      updateMessage(error.message, "error");
    }
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }
})();
