window.sampleL =
  "Nobul Corporation(nobul.com):OEM:Nobul Marketplace::B+:AMS(20190809):A7A5A2CD0497760AD360B13AC9A2537860613F56A720857B640C2B842A2C89C062AABEF5C7";

if (!window.sampleL) {
  window.sampleL = localStorage.getItem("webviewer-samples-key");
  if (!window.sampleL) {
    var queryString = window.location.search.substring(1);
    var fieldValPairs = queryString.split("&");

    var isXod = false;
    for (var i = 0; i < fieldValPairs.length; i++) {
      var fieldVal = fieldValPairs[i].split("=");
      if (fieldVal[0] === "doctype" && fieldVal[1] === "xod") {
        isXod = true;
        break;
      }
    }

    if (!isXod) {
      window.sampleL = window.prompt(
        "No license key is specified.\nPlease enter your key here or add it to samples-key.js inside the WebViewer folder.",
        ""
      );
      if (window.sampleL) {
        localStorage.setItem("webviewer-samples-key", window.sampleL);
      }
    }
  }
}
