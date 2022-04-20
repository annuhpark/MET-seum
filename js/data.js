/* exported data */
var data = {
  view: 'search-form',
  entries: [],
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data-model');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function storeLocal(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-model', dataJSON);
}
window.addEventListener('beforeunload', storeLocal);
