document.getElementById('testAdd').addEventListener('click', testAdd);
function testAdd() {
  const jsonToSend = {
    'email': 'clem@gmail.com',
    'password': 'root',
  };
  $.ajax({
    url: 'http://localhost:4000/users/add/',
    type: 'POST',
    data: JSON.stringify(jsonToSend),
    contentType: 'application/json',
    success: function(data, status) {
      alert('success add');
    },
    error: function(request, msg, error) {
      alert('error add');
    },
  });
}
document.getElementById('testGet').addEventListener('click', testGet);
function testGet() {
  $.ajax({
    url: 'http://localhost:4000/users/',
    type: 'GET',
    success: function(data, status) {
      alert('success add');
    },
    error: function(request, msg, error) {
      alert('error add');
    },
  });
}
document.getElementById('testGetWatchlist').addEventListener('click', testGetWatchlist);
function testGetWatchlist() {
  $.ajax({
    url: 'http://localhost:4000/watchlist/'+'cw-9zlu4p1w3ujpecuejv',
    type: 'GET',
    success: function(data, status) {
      console.log(data);
      document.getElementById('getresult').innerHTML = JSON.stringify( data);
    },
    error: function(request, msg, error) {
      alert('error get wl');
    },
  });
}
document.getElementById('testAddMovieWatchlist').addEventListener('click', testAddMovieWL);
function testAddMovieWL() {
  const jsonToSend = {
    'movieid': '42a',
  };
  $.ajax({
    url: 'http://localhost:4000/watchlist/'+'cw-9zlu4p1w3ujpecuejv'+'/add',
    type: 'POST',
    data: JSON.stringify(jsonToSend),
    contentType: 'application/json',
    success: function(data, status) {
      alert('success add');
    },
    error: function(request, msg, error) {
      alert('error add');
    },
  });
}
document.getElementById('testRemoveMovieWatchlist').addEventListener('click', testRemoveMovieWL);
function testRemoveMovieWL() {
  const jsonToSend = {
    'movieid': '42a',
  };
  $.ajax({
    url: 'http://localhost:4000/watchlist/'+'cw-9zlu4p1w3ujpecuejv',
    type: 'DELETE',
    data: JSON.stringify(jsonToSend),
    contentType: 'application/json',
    success: function(data, status) {
      alert('success add');
    },
    error: function(request, msg, error) {
      alert('error add');
    },
  });
}
document.getElementById('testGetMovie').addEventListener('click', testGetMovie);
function testGetMovie() {
  const jsonToSend = {
    'latitude': 47.017,
    'longitude': 2.3499,
    'radius': 50,
  };
  $.ajax({
    url: 'http://localhost:4000/movies/244560',
    type: 'GET',
    data: (jsonToSend),
    contentType: 'application/json',
    success: function(data, status) {
      console.log(data);
      document.getElementById('getresult').innerHTML = JSON.stringify( data);
    },
    error: function(request, msg, error) {
      console.log('error get wl');
    },
  });
}
document.getElementById('testGetRecentMovies').addEventListener('click', testGetRecentMovies);
function testGetRecentMovies() {
  const jsonToSend = {
    'interval': [0, 0],
  };
  $.ajax({
    url: 'http://localhost:4000/movies/',
    type: 'GET',
    data: (jsonToSend),
    contentType: 'application/json',
    success: function(data, status) {
      console.log(data);
      document.getElementById('getresult').innerHTML = JSON.stringify( data);
    },
    error: function(request, msg, error) {
      console.log('error get wl');
    },
  });
}
