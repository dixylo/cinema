export async function load_rooms () {
  return fetch("https://cinema-react.firebaseio.com/cinema/rooms.json");
}

export async function load_users () {
  return fetch("https://cinema-react.firebaseio.com/cinema/users.json");
}

export async function load_slides () {
  return fetch('https://cinema-react.firebaseio.com/cinema/slides.json');
}

export async function load_movies () {
  return fetch('https://cinema-react.firebaseio.com/cinema/movies.json');
}

export async function load_comments () {
  return fetch('https://cinema-react.firebaseio.com/cinema/comments.json');
}

export async function load_orders () {
  return fetch('https://cinema-react.firebaseio.com/cinema/orders.json');
}

export async function reserve_seats (rooms) {
  const jsonRooms = JSON.stringify(rooms);
  return fetch("https://cinema-react.firebaseio.com/cinema.json", {
    method: 'PATCH',
    body: jsonRooms
  });
}

export async function add_user (user) {
  const jsonUser = JSON.stringify(user);
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${user.userId}.json`, {
    method: 'PATCH',
    body: jsonUser
  })
}

export async function add_order (userId, order) {
  const jsonOrder = JSON.stringify(order);
  return fetch(`https://cinema-react.firebaseio.com/cinema/orders/${userId}.json`, {
    method: 'POST',
    body: jsonOrder
  });
}

export async function add_comment (movieId, comment) {
  const jsonComment = JSON.stringify(comment);
  return fetch(`https://cinema-react.firebaseio.com/cinema/comments/${movieId}.json`, {
    method: 'POST',
    body: jsonComment
  })
}

export async function change_password (userId, password) {
  const jsonPassword = JSON.stringify({ password });
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${userId}.json`, {
    method: 'PATCH',
    body: jsonPassword
  });
}

export async function delete_comment (movieId, commentIndex) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/comments/${movieId}/${commentIndex}.json`, {
    method: 'DELETE',
  })
}

export async function delete_order (userId, orderIndex) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/orders/${userId}/${orderIndex}.json`, {
    method: 'DELETE',
  })
}

// import layout from '../assets/cinema.xml';
// export async function loadRoomsFromXML () {
//   const xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET", layout, false);
//   xmlhttp.send();
//   const xmlDoc = xmlhttp.responseXML;
//   const roomList = xmlDoc.getElementsByTagName("Room");
//   const rooms = [...roomList];
//   const rmsLen = rooms.length;
//   for (var k = 0; k < rmsLen; k++) {
//     const rowList = roomList[k].getElementsByTagName("Row");
//     rooms[k] = { id: k + 1, rows: [...rowList] };	    
//     const rwsLen = rowList.length;
//     for (var j = 0; j < rwsLen; j++) {
//       const seatList = rowList[j].getElementsByTagName("Seat");
//       rooms[k].rows[j] = { id: j + 1, seats: [...seatList] };
//       const stsLen = seatList.length;
//       for (var i = 0; i < stsLen; i++) {
//         const id = seatList[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
//         //const status = seatList[i].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
//         const price = seatList[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
//         rooms[k].rows[j].seats[i] = { id, status: '', price };
//     	}
//     }
//   }
//   store.dispatch(initRooms(rooms));

//   // Initialize seats in firebase;
//   const jsonRooms = JSON.stringify({ rooms });
//   return fetch("https://cinema-react.firebaseio.com/cinema.json", {
//     method: 'PATCH',
//     body: jsonRooms
//   });
// }