// ==UserScript==
// @name         Keyword Fetch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fetch keywords and search on Google
// @author       zuyfun
// @match        *://*.m.pipedream.net*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  "use strict";
  //get url
  const url = window.location.href;
  // Function to make a GET request to the provided URL
  function fetchKeywords() {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function (response) {
        // Parse the response to get the keywords array
        var keywords = JSON.parse(response.responseText);
        // Iterate over the keywords and search each one
        keywords.forEach(function (keyword) {
          searchKeyword(keyword);
        });
      },
    });
  }

  // Function to perform a Google search for a keyword
  function searchKeyword(keyword) {
    console.log("Open gooogle search for keyword :>> ", keyword);
    window.open(`https://www.google.com/search?q=${keyword}`, "_blank");
    fetchKeywords();
  }
})();
