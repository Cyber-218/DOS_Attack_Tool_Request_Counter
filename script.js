// This function will be called every time a request is made by the DOS attack tool.
function onRequest(event) {
  // Get the current request count.
  var count = document.getElementById("count").innerHTML;

  // Increment the request count.
  count++;

  // Update the request count on the page.
  document.getElementById("count").innerHTML = count;

  // Get the type of request.
  var type = event.request.method;

  // Update the request type on the page.
  document.getElementById("type").innerHTML = type;

  // Get the IP address of the sender.
  var ip = event.request.headers["x-forwarded-for"] || event.request.socket.remoteAddress;

  // Update the IP address on the page.
  document.getElementById("ip").innerHTML = ip;

  // Get the time the request was sent.
  var time = new Date().toLocaleString();

  // Update the time the request was sent on the page.
  document.getElementById("time").innerHTML = time;

  // Add the request to the count by IP table.
  var countByIP = document.getElementById("count-by-ip");
  var row = countByIP.insertRow(-1);
  row.appendChild(document.createElement("td"));
  row.appendChild(document.createTextNode(ip));
  row.appendChild(document.createElement("td"));
  row.appendChild(document.createTextNode(count));

  // Determine the strength of the attack.
  var strength = determineStrength(count);

  // Update the result on the page.
  document.getElementById("result").innerHTML = strength;
}

// Attach the onRequest() function to the window object.
window.addEventListener("request", onRequest);

// This function determines the strength of the attack.
function determineStrength(count) {
  if (count < 10) {
    return "Weak";
  } else if (count < 100) {
    return "Medium";
  } else {
    return "Strong";
  }
}
