"use strict";

(function () {
  let mopedidField;
  let nameField;
  let itemsInStockField;
  let topSpeedField;
  let modelYearField;
  let messagearea;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    mopedidField = document.getElementById("mopedid");
    nameField = document.getElementById("name");
    itemsInStockField = document.getElementById("itemsInStock");
    topSpeedField = document.getElementById("topSpeed");
    modelYearField = document.getElementById("modelYear");
    messagearea = document.getElementById("messagearea");

    updateFields();

    document.getElementById("submit").addEventListener("click", send);

    mopedidField.addEventListener("focus", clearAll);
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessage();
    }
  }

  function updateFields() {
    if (searchState) {
      mopedidField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      itemsInStockField.setAttribute("readonly", true);
      topSpeedField.setAttribute("readonly", true);
      modelYearField.setAttribute("readonly", true);
    } else {
      mopedidField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      itemsInStockField.removeAttribute("readonly");
      topSpeedField.removeAttribute("readonly");
      modelYearField.removeAttribute("readonly");
    }
  } //updateFields end

  function clearFieldValues() {
    mopedidField.value = "";
    nameField.value = "";
    itemsInStockField.value = "";
    topSpeedField.value = "";
    modelYearField.value = "";
    searchState = true;
    updateFields();
  }

  function updateMoped(result) {
    if (result.length === 0) return;
    const moped = result[0];
    mopedidField.value = moped.mopedid;
    nameField.value = moped.name;
    itemsInStockField.value = moped.itemsInStock;
    topSpeedField.value = moped.topSpeed;
    modelYearField.value = moped.modelYear;
    searchState = false;
    updateFields();
  }

  async function send() {
    try {
      if (searchState) {
        if (mopedidField.value.trim().length > 0) {
          const data = await fetch(
            `http://localhost:4000/api/moped/${mopedidField.value}`,
            { mode: "cors" }
          );
          const result = await data.json();
          if (result) {
            if (result.message) {
              updateMessage(result.message, result.type);
            } else {
              updateMoped(result);
            }
          }
        }
      } else {
        const moped = {
          mopedid: mopedidField.value,
          name: nameField.value,
          itemsInStock: itemsInStockField.value,
          topSpeed: topSpeedField.value,
          modelYear: modelYearField.value,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(moped),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };

        const data = await fetch(
          `http://localhost:4000/api/moped/${moped.id}`,
          options
        );

        const status = await data.json();

        if (status.message) {
          updateMessage(status.message, status.type);
        }

        searchState = true;
        updateFields();
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }
})();
