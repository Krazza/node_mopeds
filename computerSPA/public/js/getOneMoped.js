"use strict";

(function () {
  let resultarea;
  let messagearea;
  let mopedId;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    mopedId = document.getElementById("mopedid");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    resultarea.innerHTML = "";
    try {
      if (mopedId.value.trim().length > 0) {
        const data = await fetch(
          `http://localhost:4000/api/mopeddb/${mopedId.value}`,
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
    } catch (error) {
      updateMessage(`Not found. ${error.message}`, "error");
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

  function updateMoped(result) {
    if (result.length === 0) return;
    const moped = result[0];
    resultarea.innerHTML = `
        <p><span class="legend">Id</span> ${moped.mopedid}</p>
        <p><span class="legend">Name</span> ${moped.name}</p>
        <p><span class="legend">Type</span> ${moped.itemsInStock}</p>
        <p><span class="legend">Processor</span> ${moped.topSpeed}</p>
        <p><span class="legend">Amount</span> ${moped.modelYear}</p>
        `;
  }
})();
