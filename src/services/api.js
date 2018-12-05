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

export async function reserve_seats (rooms) {
  const jsonRooms = JSON.stringify(rooms);
  return fetch("https://cinema-react.firebaseio.com/cinema.json", {
    method: 'PATCH',
    body: jsonRooms
  });
}

export async function add_user (users) {
  const jsonUsers = JSON.stringify(users);
  return fetch("https://cinema-react.firebaseio.com/cinema/users.json", {
    method: 'PATCH',
    body: jsonUsers
  })
}

export async function place_order (userIndex, order) {
  const jsonOrder = JSON.stringify(order);
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${userIndex}/orders.json`, {
    method: 'POST',
    body: jsonOrder
  });
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