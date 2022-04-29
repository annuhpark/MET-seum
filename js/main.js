var $ul = document.querySelector('ul.result');
var $views = document.querySelectorAll('.view');
var $form = document.querySelector('form');
var $department = document.getElementById('department');
var $search = document.querySelector('.search-box');
var $folder = document.querySelector('.fa-folder-open');
var $subHeadingOfDepartment = document.querySelector('h2.sub-heading');
var $options = document.querySelectorAll('option');
var $ul2 = document.querySelector('ul.favorites');
var $heading = document.querySelector('.heading-text');
var $ul3 = document.querySelector('ul.details');
var $modal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');

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
    if (xhr.response.primaryImage === undefined || xhr.response.primaryImage === '') {
      $image.setAttribute('src', 'http://www.hometownandcity.com/media/image/default.png');
    } else {
      $image.setAttribute('src', xhr.response.primaryImage);
    }
    $columnHalf.appendChild($image);
    var $secondColumnHalf = document.createElement('div');
    $secondColumnHalf.setAttribute('class', 'column-half left-padding');
    $row.appendChild($secondColumnHalf);
    var $secondRow = document.createElement('div');
    $secondRow.setAttribute('class', 'row flex-direction-column text-align-center');
    $secondColumnHalf.appendChild($secondRow);
    var $blackLineDivider = document.createElement('hr');
    $blackLineDivider.setAttribute('class', 'thinner-solid');
    $secondRow.appendChild($blackLineDivider);
    var $title = document.createElement('h3');
    $title.setAttribute('class', 'title');
    if (xhr.response.title === '') {
      $title.textContent = 'Title: Unknown';
    } else {
      $title.textContent = xhr.response.title;
    }
    $secondRow.appendChild($title);
    var $objectDate = document.createElement('h3');
    $objectDate.setAttribute('class', 'object-date');
    if (xhr.response.objectDate === '') {
      $objectDate.textContent = 'Date: Unknown';
    } else {
      $objectDate.textContent = xhr.response.objectDate;
    }
    $secondRow.appendChild($objectDate);
    var $medium = document.createElement('h4');
    $medium.setAttribute('class', 'medium');
    if (xhr.response.medium === '') {
      $medium.textContent = 'Medium: Unknown';
    } else {
      $medium.textContent = xhr.response.medium;
    }
    $secondRow.appendChild($medium);
    var $artistDisplayName = document.createElement('h3');
    $artistDisplayName.setAttribute('class', 'artist-display-name');
    if (xhr.response.artistDisplayName === '') {
      $artistDisplayName.textContent = 'Artist: Unknown';
    } else {
      $artistDisplayName.textContent = xhr.response.artistDisplayName;
    }
    $secondRow.appendChild($artistDisplayName);
    var $artistDisplayBio = document.querySelector('h4');
    $artistDisplayBio.setAttribute('class', 'artist-display-bio');
    if (xhr.response.artistDisplayBio === '') {
      $artistDisplayBio.textContent = 'Biography: Unknown';
    } else {
      $artistDisplayBio.textContent = xhr.response.artistDisplayBio;
    }
    $secondRow.appendChild($artistDisplayBio);
    var $secondBlackLineDivider = document.createElement('hr');
    $secondBlackLineDivider.setAttribute('class', 'thinner-solid');
    $secondRow.appendChild($secondBlackLineDivider);
    var $heart = document.createElement('i');
    $heart.setAttribute('class', 'far fa-heart heading-padding');
    $secondRow.appendChild($heart);
    $heart.addEventListener('click', function (event) {
      var entry = {
        title: xhr.response.title,
        primaryImage: xhr.response.primaryImage,
        entryId: data.nextEntryId,
        artist: xhr.response.artistDisplayName,
        objectDate: xhr.response.objectDate,
        medium: xhr.response.medium,
        artistBio: xhr.response.artistDisplayBio,
        linkResource: xhr.response.objectURL
      };
      data.nextEntryId++;
      data.entries.unshift(entry);
      $ul2.prepend(renderEntries(entry));
      switchViewTo('favorites');
    });
  });
  xhr.send();
}

function renderEntries(artwork) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'container heading-padding');
  $li.setAttribute('data-entry-id', artwork.entryId);
  $ul2.appendChild($li);
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row align-items-center wrap');
  $li.appendChild($row);
  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);
  var $image = document.createElement('img');
  if (artwork.primaryImage === undefined || artwork.primaryImage === '') {
    $image.setAttribute('src', 'http://www.hometownandcity.com/media/image/default.png');
  } else {
    $image.setAttribute('src', artwork.primaryImage);
  }
  $columnHalf.appendChild($image);
  $image.classList.add('hover-class-one');
  $image.addEventListener('click', function (event) {
    var $images = document.querySelectorAll('img');
    for (let i = 0; i < $images.length; i++) {
      if (event.target === $images[i]) {
        var $li = document.createElement('li');
        $li.setAttribute('class', 'container');
        $ul3.appendChild($li);
        var $row = document.createElement('div');
        $row.setAttribute('class', 'row align-items-center wrap');
        $li.appendChild($row);
        var $columnHalf = document.createElement('div');
        $columnHalf.setAttribute('class', 'column-half');
        $row.appendChild($columnHalf);
        var $image = document.createElement('img');
        $image.setAttribute('src', $images[i].getAttribute('src'));
        $columnHalf.appendChild($image);
        var $secondColumnHalf = document.createElement('div');
        $secondColumnHalf.setAttribute('class', 'column-half left-padding');
        $row.appendChild($secondColumnHalf);
        var $secondRow = document.createElement('div');
        $secondRow.setAttribute('class', 'row flex-direction-column text-align-center');
        $secondColumnHalf.appendChild($secondRow);
        var $blackLineDivider = document.createElement('hr');
        $blackLineDivider.setAttribute('class', 'thinner-solid');
        $secondRow.appendChild($blackLineDivider);
        var $title = document.createElement('h3');
        $title.setAttribute('class', 'title');
        $title.textContent = event.target.closest('.align-items-center').querySelector('h3').textContent;
        $secondRow.appendChild($title);
        var $objectDate = document.createElement('h3');
        $objectDate.setAttribute('class', 'object-date');
        $objectDate.textContent = event.target.closest('.align-items-center').querySelector('h3.object-date').textContent;
        $secondRow.appendChild($objectDate);
        var $medium = document.createElement('h4');
        $medium.setAttribute('class', 'medium');
        if (data.entries[i].medium === '') {
          $medium.textContent = 'Medium: Unknown';
        } else {
          $medium.textContent = data.entries[i].medium;
        }
        $secondRow.appendChild($medium);
        var $artistDisplayName = document.createElement('h3');
        $artistDisplayName.setAttribute('class', 'artist-display-name');
        $artistDisplayName.textContent = event.target.closest('.align-items-center').querySelector('h3.artist-display-name').textContent;
        $secondRow.appendChild($artistDisplayName);
        var $artistDisplayBio = document.createElement('h4');
        $artistDisplayBio.setAttribute('class', 'artist-display-bio');
        if (data.entries[i].artistBio === '') {
          $artistDisplayBio.textContent = 'Bio: Unknown';
        } else {
          $artistDisplayBio.textContent = data.entries[i].artistBio;
        }
        $secondRow.appendChild($artistDisplayBio);
        var $linkResource = document.createElement('h3');
        $linkResource.setAttribute('class', 'link-resource');
        if (data.entries[i].linkResource === '') {
          $linkResource.textContent = 'URL: Unknown';
        } else {
          $linkResource.textContent = data.entries[i].linkResource;
        }
        $secondRow.appendChild($linkResource);
        var $secondBlackLineDivider = document.createElement('hr');
        $secondBlackLineDivider.setAttribute('class', 'thinner-solid');
        $secondRow.appendChild($secondBlackLineDivider);
        switchViewTo('favorite-details');
      }
    }
  });
  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half left-padding');
  $row.appendChild($secondColumnHalf);
  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row flex-direction-column text-align-center');
  $secondColumnHalf.appendChild($secondRow);
  var $blackLineDivider = document.createElement('hr');
  $blackLineDivider.setAttribute('class', 'thinner-solid');
  $secondRow.appendChild($blackLineDivider);
  var $title = document.createElement('h3');
  $title.setAttribute('class', 'title');
  if (artwork.title === undefined || artwork.title === '') {
    $title.textContent = 'Title: Unknown';
  } else {
    $title.textContent = artwork.title;
  }
  $secondRow.appendChild($title);
  var $artistDisplayName = document.createElement('h3');
  $artistDisplayName.setAttribute('class', 'artist-display-name');
  if (artwork.artistDisplayName === undefined || artwork.artistDisplayName === '') {
    $artistDisplayName.textContent = 'Artist: Unknown';
  } else {
    $artistDisplayName.textContent = artwork.artistDisplayName;
  }
  $secondRow.appendChild($artistDisplayName);
  var $objectDate = document.createElement('h3');
  $objectDate.setAttribute('class', 'object-date');
  if (artwork.objectDate === undefined || artwork.objectDate === '') {
    $objectDate.textContent = 'Date: Unknown';
  } else {
    $objectDate.textContent = artwork.objectDate;
  }
  $secondRow.appendChild($objectDate);
  var $secondBlackLineDivider = document.createElement('hr');
  $secondBlackLineDivider.setAttribute('class', 'thinner-solid');
  $secondRow.appendChild($secondBlackLineDivider);
  var $linkSlash = document.createElement('i');
  $linkSlash.setAttribute('class', 'fas fa-unlink heading-padding red-orange-text');
  $secondRow.appendChild($linkSlash);
  $linkSlash.addEventListener('click', function (event) {
    $modal.className = 'modal view';
    data.remove = $linkSlash.closest('.flex-direction-column').querySelector('h3.title').textContent;
  });
  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var value = renderEntries(data.entries[i]);
    $ul2.appendChild(value);
  }
  switchViewTo(data.view);
});

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
  $ul3.innerHTML = '';
  $form.reset();
  switchViewTo('search-form');
});

$folder.addEventListener('click', function (event) {
  switchViewTo('favorites');
  $ul3.innerHTML = '';
});
$cancelButton.addEventListener('click', function (event) {
  $modal.className = 'modal view hidden';
});

$confirmButton.addEventListener('click', function (event) {
  for (let i = 0; i < $ul2.children.length; i++) {
    if ($ul2.children[i].querySelector('h3.title').textContent === data.remove) {
      $ul2.children[i].remove();
      data.entries.splice(i, 1);
    }
  }
  switchViewTo('favorites');
  data.remove = null;
});
