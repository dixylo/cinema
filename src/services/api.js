import { getDatabase, onValue, ref, push, set, update, remove } from 'firebase/database';

// general data
export function fetch_data (path, dispatch, actionCreator) {
  const db = getDatabase();
  onValue(ref(db, `/cinema/${path}`), (snapshot) => {
    const data = snapshot.val();
    dispatch(actionCreator(data));
  }, (error) => console.log(error));
}

// comments
export function create_comment (movieId, comment) {
  const db = getDatabase();
  const commentListRef = ref(db, `/cinema/comments/${movieId}`);
  const newCommentRef = push(commentListRef);
  set(newCommentRef, comment).catch((error) => console.log(error));
}

export function delete_comment (movieId, commentId) {
  const db = getDatabase();
  remove(ref(db, `/cinema/comments/${movieId}/${commentId}`)).catch((error) => console.log(error));
}

// orders
export function fetch_user_orders (userId, dispatch, actionCreator) {
  const db = getDatabase();
  onValue(ref(db, `/cinema/orders/${userId}`), (snapshot) => {
    const data = { [userId]: snapshot.val() };
    dispatch(actionCreator(data));
  }, (error) => console.log(error));
}

export function create_order (userId, order) {
  const db = getDatabase();
  const orderListRef = ref(db, `/cinema/orders/${userId}`);
  const newOrderRef = push(orderListRef);
  set(newOrderRef, order).catch((error) => console.log(error));
}

export function delete_order (userId, orderId) {
  const db = getDatabase();
  remove(ref(db, `/cinema/orders/${userId}/${orderId}`)).catch((error) => console.log(error));
}

// seats
export function toggle_seats (coors, status) {
  const db = getDatabase();

  let updates = {};
  coors.forEach(coor => {
    const { roomIndex, rowIndex, seatIndex, session } = coor;
    updates = {
      ...updates, [`/cinema/rooms/${roomIndex}/rows/${rowIndex}/seats/${seatIndex}/status/${session}`]: status
    }
  });

  return update(ref(db), updates);
}

// movies
export function delete_movie (movieId) {
  const db = getDatabase();
  remove(ref(db, `/cinema/movies/${movieId}`)).catch((error) => console.log(error));
}

// users
export function delete_user (userId) {
  const db = getDatabase();
  remove(ref(db, `/cinema/users/${userId}`)).catch((error) => console.log(error));
}
