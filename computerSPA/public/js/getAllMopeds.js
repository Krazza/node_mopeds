"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("http://localhost:4000/api/mopeddb", {
        mode: "cors",
      });
      const mopeddb = await data.json();

      const resultset = document.getElementById("resultset");
      for (const moped of mopeddb) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(moped.mopedid));
        tr.appendChild(createCell(moped.name));
        tr.appendChild(createCell(moped.itemsInStock));
        tr.appendChild(createCell(moped.topSpeed));
        tr.appendChild(createCell(moped.modelYear));
        resultset.appendChild(tr);
      }
    } catch (error) {
      document.getElementById("messagearea").innerHTML = `
            <p class="error">${error.message}</p>`;
    }
  }

  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
