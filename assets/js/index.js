const container = document.getElementById("container");
const doSearch = document.getElementById("doSearch");
const alertBtn = document.getElementById("button");
const statusDisplay = document.getElementById("statusDisplay");
const cancel = document.getElementById("cancelSearch");
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
let worker;
function search() {
  doSearch.disabled = true;
  worker = new Worker("./webworker.js");
  worker.postMessage({
    from: fromInput.value,
    to: toInput.value,
  });
  worker.onmessage = recieveWorker;
  worker.onerror = errorThrow;
}
function recieveWorker(event) {
  let message = event.data;
  let primeList = "";
  if (message.type == "primelist") {
    for (let i = 0; i < message.prime.length; i++) {
      primeList += message.prime[i] + ",";
    }
    container.innerHTML = primeList;
    if (message.prime.length == 0) {
      statusDisplay.innerText = "Search failed to find results .";
      statusDisplay.style.color = "rgb(210, 69, 69)";
      doSearch.disabled = false;
    } else {
      statusDisplay.innerText = "Result Found !";
      statusDisplay.style.color = "rgb(85, 187, 97)";
      doSearch.disabled = false;
    }
  } else if (message.type == "progress") {
    statusDisplay.innerText = message.progress + "%";
    statusDisplay.style.color = "rgb(210, 194, 69)";
  }
}
function cancelSearch() {
  worker.terminate();
  worker = null;
  statusDisplay.innerText = "Search Cancelled .";
  statusDisplay.style.color = "rgb(85, 187, 97)";
  doSearch.disabled = false;
}
function errorThrow(errormessage){
  statusDisplay.innerText = errormessage.error;
  statusDisplay.style.color = "rgb(210, 69, 69)";
  doSearch.disabled = false;
}
let eventCount = 1;
doSearch.onclick = function () {
  search();
};
alertBtn.onclick = function () {
  alert("Event You Clicked " + eventCount);
  eventCount += 1;
};
cancel.onclick = function () {
  cancelSearch();
};
