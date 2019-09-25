export async function load_rooms () {
  return fetch('https://cinema-react.firebaseio.com/cinema/rooms.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7');
}

export async function load_users () {
  return fetch('https://cinema-react.firebaseio.com/cinema/users.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7');
}

export async function load_movies () {
  return fetch('https://cinema-react.firebaseio.com/cinema/movies.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7');
}

export async function load_comments () {
  return fetch('https://cinema-react.firebaseio.com/cinema/comments.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7');
}

export async function load_orders () {
  return fetch('https://cinema-react.firebaseio.com/cinema/orders.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7');
}

export async function query_movie (movieId) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/movies/${movieId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`);
}

export async function query_comments (movieId) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/comments/${movieId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`);
}

export async function update_seats (coors, status) {
  let coorsObject = {};
  coors.forEach(coor => {
    const { roomIndex, rowIndex, seatIndex, session } = coor;
    coorsObject = {
      ...coorsObject, [`${roomIndex}/rows/${rowIndex}/seats/${seatIndex}/status/${session}`]: status
    }
  });
  const jsonCoors = JSON.stringify(coorsObject);
  return fetch('https://cinema-react.firebaseio.com/cinema/rooms.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7', {
    method: 'PATCH',
    body: jsonCoors
  });
}

export async function cancel_reservation (rooms) {
  const jsonRooms = JSON.stringify(rooms);
  return fetch('https://cinema-react.firebaseio.com/cinema.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7', {
    method: 'PATCH',
    body: jsonRooms
  });
}

export async function add_user (user) {
  const jsonUser = JSON.stringify(user);
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${user.userId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'PATCH',
    body: jsonUser
  })
}

export async function add_order (userId, order) {
  const jsonOrder = JSON.stringify(order);
  return fetch(`https://cinema-react.firebaseio.com/cinema/orders/${userId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'POST',
    body: jsonOrder
  });
}

export async function add_comment (movieId, comment) {
  const jsonComment = JSON.stringify(comment);
  return fetch(`https://cinema-react.firebaseio.com/cinema/comments/${movieId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'POST',
    body: jsonComment
  })
}

export async function change_password (userId, password) {
  const jsonPassword = JSON.stringify({ password });
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${userId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'PATCH',
    body: jsonPassword
  });
}

export async function delete_comment (movieId, commentKey) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/comments/${movieId}/${commentKey}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'DELETE',
  })
}

export async function delete_order (userId, orderKey) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/orders/${userId}/${orderKey}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'DELETE',
  })
}

export async function delete_user (userId) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/users/${userId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'DELETE',
  })
}

export async function delete_movie (movieId) {
  return fetch(`https://cinema-react.firebaseio.com/cinema/movies/${movieId}.json?auth=VCh3xP4hio5tANuQr63ST9oCdM4UiDW6KPRomez7`, {
    method: 'DELETE',
  })
}