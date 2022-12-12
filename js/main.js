<<<<<<< HEAD
// Unordered Lists:
const $ulSearchResult = document.querySelector('ul.result');
const $ulFavorites = document.querySelector('ul.favorites');
const $ulDetails = document.querySelector('ul.details');
=======
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
var $h3Favorites = document.querySelector('h3.favorites');
var $noFavoritesParent = document.querySelector('div.no-favorites');
var $loader = document.querySelector('.loader');
>>>>>>> origin/main

// Switching View (display of page):
var $views = document.querySelectorAll('.view');

// Submitting Form w/ Button Click:
var $form = document.querySelector('form');

// Update Department Title According to Search:
var $department = document.getElementById('department');
var $options = document.querySelectorAll('option');
var $searchedArtworkDepartment = document.querySelector('h2.sub-heading');

// Search value from User:
var $search = document.querySelector('.search-box');

// Folder Icon at Top Left:
var $folder = document.querySelector('.fa-folder-open');

// Main Heading at Top Center:
var $heading = document.querySelector('.heading-text');

// Modal, then Confirm or Cancel Deleting Artwork from Favorites:
var $modal = document.querySelector('.modal');
var $confirmButton = document.querySelector('.confirm-button');
var $cancelButton = document.querySelector('.cancel-button');

// Favorites List Update:
var $noFavorites = document.querySelector('div.no-favorites');
var $noFavoritesText = document.querySelector('h3.favorites');

function getArtworkByDepartmentAndQuery() {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=' + $department.value + '&q=' + $search.value);
  xhr.responseType = 'json';
  $loader.className = 'loader';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
    if (xhr.response.objectIDs === null) {
      const $li = document.createElement('li');
      $li.setAttribute('class', 'container');
      $ulSearchResult.appendChild($li);
      const $row = document.createElement('div');
      $row.setAttribute('class', 'row flex-direction-column text-align-center wrap');
      $li.appendChild($row);
      const $errorText = document.createElement('h3');
      $errorText.setAttribute('class', 'title');
      $errorText.textContent = 'No results that match your criteria. Please try again!';
      $row.appendChild($errorText);
      $loader.className = 'loader hidden';
      return $errorText;
    }
    const randomNumber = Math.floor(Math.random() * xhr.response.objectIDs.length);
    const randomArtwork = xhr.response.objectIDs[randomNumber];
    getArtworkInformation(randomArtwork);
  });
  xhr.send();
  switchViewTo('results');
}
$form.addEventListener('submit', getArtworkByDepartmentAndQuery);

function getArtworkInformation(objectID) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID);
  xhr.responseType = 'json';
  $loader.className = 'loader';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < $options.length; i++) {
      if ($department.value === $options[i].value) {
        $searchedArtworkDepartment.textContent = $options[i].textContent;
      }
    }
    var $li = document.createElement('li');
    $li.setAttribute('class', 'container');
    $ulSearchResult.appendChild($li);
    var $row = document.createElement('div');
    $row.setAttribute('class', 'row align-items-center wrap');
    $li.appendChild($row);
    var $columnHalf = document.createElement('div');
    $columnHalf.setAttribute('class', 'column-half');
    $row.appendChild($columnHalf);
    var $image = document.createElement('img');
    if (xhr.response.primaryImage === undefined || xhr.response.primaryImage === '') {
      $image.setAttribute('src', 'images/no-image-available.jpg');
    } else {
      $image.setAttribute('src', xhr.response.primaryImage);
    }
    $columnHalf.appendChild($image);
    var $secondColumnHalf = document.createElement('div');
    $secondColumnHalf.setAttribute('class', 'column-half left-padding');
    $row.appendChild($secondColumnHalf);
    var $secondRow = document.createElement('div');
    $secondRow.setAttribute('class', 'row flex-direction-column text-align-center wrap');
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
      $noFavoritesText.remove();
      $ulFavorites.prepend(renderEntries(entry));
      switchViewTo('favorites');
    });
  });
  $loader.className = 'loader hidden';
  xhr.send();
}

function renderEntries(artwork) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'container heading-padding');
  $li.setAttribute('data-entry-id', artwork.entryId);
  $ulFavorites.appendChild($li);
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row align-items-center wrap');
  $li.appendChild($row);
  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);
  var $image = document.createElement('img');
  if (artwork.primaryImage === undefined || artwork.primaryImage === '') {
    $image.setAttribute('src', 'images/no-image-available.jpg');
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
        $ulDetails.appendChild($li);
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
        if (data.entries[i].medium === '' || data.entries[i].medium === undefined) {
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
        var $linkResource = document.createElement('h5');
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
    $ulSearchResult.appendChild(value);
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
  $ulSearchResult.innerHTML = '';
  $ulDetails.innerHTML = '';
  $form.reset();
  switchViewTo('search-form');
});

$folder.addEventListener('click', function (event) {
  switchViewTo('favorites');
  $ulDetails.innerHTML = '';
});

$cancelButton.addEventListener('click', function (event) {
  $modal.className = 'modal view hidden';
});

$confirmButton.addEventListener('click', function (event) {
  for (let i = 0; i < $ulFavorites.children.length; i++) {
    if ($ulFavorites.children[i].querySelector('h3.title').textContent === data.remove) {
      $ulFavorites.children[i].remove();
      data.entries.splice(i, 1);
      if (data.entries.length === 0) {
        $noFavorites.appendChild($noFavoritesText);
      }
    }
  }
  switchViewTo('favorites');
  data.remove = null;
});
