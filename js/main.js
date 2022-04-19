var $ul = document.querySelector('ul');
var $views = document.querySelectorAll('.view');
var $form = document.querySelector('form');
var $department = document.getElementById('department');
var $search = document.querySelector('.search-box');
// var $folder = document.querySelector('.fa-folder-open');
var $subHeadingOfDepartment = document.querySelector('h2.sub-heading');
var $options = document.querySelectorAll('option');
var $heading = document.querySelector('h1.white-text');

function getArtworksByDepartmentAndQuery() {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=' + $department.value + '&q=' + $search.value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var randomNumber = Math.floor(Math.random() * xhr.response.objectIDs.length);
    var randomArtwork = xhr.response.objectIDs[randomNumber];
    getArtworkInformation(randomArtwork);
  });
  xhr.send();
  switchViewTo('results');
}
$form.addEventListener('submit', getArtworksByDepartmentAndQuery);

function getArtworkInformation(objectID) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < $options.length; i++) {
      if ($department.value === $options[i].value) {
        $subHeadingOfDepartment.textContent = $options[i].textContent;
      }
    }
    var $li = document.createElement('li');
    $li.setAttribute('class', 'container');
    $ul.appendChild($li);
    var $row = document.createElement('div');
    $row.setAttribute('class', 'row align-items-center wrap');
    $li.appendChild($row);
    var $columnHalf = document.createElement('div');
    $columnHalf.setAttribute('class', 'column-half');
    $row.appendChild($columnHalf);
    var $image = document.createElement('img');
    $image.setAttribute('src', xhr.response.primaryImage);
    $columnHalf.appendChild($image);
    if (xhr.response.primaryImage === '') {
      $image.setAttribute('src', 'https://static.wikia.nocookie.net/to-be-a-power-in-the-shadows/images/6/68/No-image-availablex2.jpg/revision/latest?cb=20220106040708');
    }
    var $secondColumnHalf = document.createElement('div');
    $secondColumnHalf.setAttribute('class', 'column-half');
    $row.appendChild($secondColumnHalf);
    var $secondRow = document.createElement('div');
    $secondRow.setAttribute('class', 'row flex-direction-column text-align-center');
    $secondColumnHalf.appendChild($secondRow);
    var $blackLineDivider = document.createElement('hr');
    $blackLineDivider.setAttribute('class', 'thinner-solid');
    $secondRow.appendChild($blackLineDivider);
    var $title = document.createElement('h3');
    $title.setAttribute('class', 'title');
    $title.textContent = xhr.response.title;
    $secondRow.appendChild($title);
    var $objectDate = document.createElement('h3');
    $objectDate.setAttribute('class', 'object-date');
    $objectDate.textContent = xhr.response.objectDate;
    $secondRow.appendChild($objectDate);
    var $medium = document.createElement('h4');
    $medium.setAttribute('class', 'medium');
    $medium.textContent = xhr.response.medium;
    $secondRow.appendChild($medium);
    var $artistDisplayName = document.createElement('h3');
    $artistDisplayName.setAttribute('class', 'artist-display-name');
    $artistDisplayName.textContent = xhr.response.artistDisplayName;
    $secondRow.appendChild($artistDisplayName);
    var $artistDisplayBio = document.querySelector('h4');
    $artistDisplayBio.setAttribute('class', 'artist-display-bio');
    $artistDisplayBio.textContent = xhr.response.artistDisplayBio;
    $secondRow.appendChild($artistDisplayBio);
    var $secondBlackLineDivider = document.createElement('hr');
    $secondBlackLineDivider.setAttribute('class', 'thinner-solid');
    $secondRow.appendChild($secondBlackLineDivider);
    var $heart = document.createElement('i');
    $heart.setAttribute('class', 'far fa-heart heading-padding');
    $secondRow.appendChild($heart);
  });
  xhr.send();
}

/* Switching View */
function switchViewTo(targetPage) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetPage) {
      $views[i].className = 'view';
      data.view = targetPage;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

$heading.addEventListener('click', function (event) {
  $ul.innerHTML = '';
  switchViewTo('search-form');
});
