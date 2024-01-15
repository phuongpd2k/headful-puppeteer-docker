// ==UserScript==
// @name         Search google sponsored results
// @namespace    http://google.com/
// @version      1.0
// @description  Get google sponsored results and then ...
// @author       zuyfun
// @match        *://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  //Search sponsored results
  const elements = document.querySelectorAll(".uEierd");
  if (!elements) {
    console.log("No sponsored results");
  }
  const results = Array.from(elements).map((e) => {
    const title = e.querySelector(".CCgQ5")?.innerText;
    const link = e.querySelector(".sVXRqc")?.href;
    const desc = e.querySelector(".Va3FIb.r025kc.lVm3ye")?.innerText;
    return { title: title, link: link, description: desc };
  });
  console.log(results);

  //Close tab
  window.close();
  //Send results to server using fetch

  // const url = "http://localhost:3000/results";
  // fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(results),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.text())
  //   .then((response) => console.log("Success:", response))
  //   .catch((error) => console.error("Error:", error));
})();
