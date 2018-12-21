import { load_rooms, update_seats } from '../services/api';
import { seatIdToIndices } from '../services/utils';

const INIT_ROOMS = 'INIT_ROOMS';
const TOGGLE_SEAT = 'TOGGLE_SEAT';
const RESERVE_SEATS = 'RESERVE_SEATS';
const CANCEL_RESERVATION = 'CANCEL_RESERVATION';
const RESERVED = 'reserved';
const SELECTED = 'selected';
const AVAILABLE = 'available';

export default function rooms (state, action) {
  if (!state) {
    state = { rooms: [] }
  }

  switch (action.type) {
    case INIT_ROOMS:
      return { rooms: action.rooms };
    case TOGGLE_SEAT:
      const newRooms = updateRoomsWithToggledSeats(state, action.coor);
      return { rooms: newRooms};
    case RESERVE_SEATS:
      return { rooms: action.rooms };
    default:
      return state;
  }
}

function updateRoomsWithToggledSeats (state, coor) {
  const { rooms } = state;
  const { room_i, row_i, seat_i, session } = coor;
  const newRooms = rooms.map(
    (room, rm_i) => {
      if (rm_i === room_i) {
        return {
          ...room,
          rows: room.rows.map(
            (row, rw_i) => {
              if (rw_i === row_i) {
                return {
                  ...row,
                  seats: row.seats.map(
                    (seat, st_i) => {
                      if (seat.status[session]) {
                        if (st_i === seat_i) {
                          switch (seat.status[session]) {
                            case RESERVED:
                              alert('You cannot select a reserved seat!');
                              return seat;
                            case SELECTED:
                              return {...seat, status: {...seat.status, [session]: AVAILABLE}};
                            case AVAILABLE:
                              return {...seat, status: {...seat.status, [session]: SELECTED}};
                            default:
                              return seat;
                          }
                        }
                        return seat;
                      }
                      if (st_i === seat_i) {
                        return {...seat, status: {...seat.status, [session]: SELECTED}};
                      }
                      return {...seat, status: {...seat.status, [session]: AVAILABLE}};
                    }
                  )
                };
              }
              return row;
            }
          )
        };
      }
      return room;
    }
  );
  return newRooms;
}

function updateRoomsWithReservedSeats (state, order) {
  const { rooms } = state;
  const { roomId, session } = order;
  const rm_i = parseInt(roomId, 10) - 1;
  const newRooms = rooms.map(
    (room, index) => {
      if (index === rm_i) {
        return {
          ...room,
          rows: room.rows.map(
            row => {
              return {
                ...row,
                seats: row.seats.map(
                  seat => {
                    if (seat.status[session]) {
                      if (seat.status[session] === SELECTED) {
                        return { ...seat, status: {...seat.status, [session]: RESERVED}};
                      }
                      return seat;
                    }
                    return {...seat, status: {...seat.status, [session]: AVAILABLE}};
                  }
                )
              };
            }
          )
        };
      }
      return room;
    }
  );
  return newRooms;
}

function updateRoomsWithCanceledReservation (state, order) {
  const { rooms } = state;
  const { roomId, session } = order;
  const rm_i = parseInt(roomId, 10) - 1;
  const newRooms = rooms.map(
    (room, index) => {
      if (index === rm_i) {
        return {
          ...room,
          rows: room.rows.map(
            row => {
              return {
                ...row,
                seats: row.seats.map(
                  seat => {
                    if (seat.status[session]) {
                      if (seat.status[session] === SELECTED) {
                        return { ...seat, status: {...seat.status, [session]: RESERVED}};
                      }
                      return seat;
                    }
                    return {...seat, status: {...seat.status, [session]: AVAILABLE}};
                  }
                )
              };
            }
          )
        };
      }
      return room;
    }
  );
  return newRooms;
}

function orderToCoordinates (order) {
  const roomIndex = parseInt(order.roomId, 10) -1;
  const coors = [];
  order.selectedSeats.forEach(seat => {
    const coor = { ...seatIdToIndices(seat), roomIndex, session: order.session};
    coors.push(coor);
  });
  return coors;
} 

// action creators
export const initRooms = (rooms) => {
  return { type: INIT_ROOMS, rooms };
};

export const toggleSeat = (coor) => {
  return { type: TOGGLE_SEAT, coor };
};

export const reserveSeats = (rooms) => {
  return { type: RESERVE_SEATS, rooms };
};

export const cancelReservation = (rooms) => {
  return { type: CANCEL_RESERVATION, rooms};
};

export const fetchRooms = () => {
  return (dispatch) => {
    return load_rooms()
      .then(response => response.json())
      .then(rooms => dispatch(initRooms(rooms)));
  };
};

export const reserveSeatsAsync = (order) => {
  return (dispatch, getState) => {
    const state = getState().rooms;
    const rooms = updateRoomsWithReservedSeats(state, order);
    const coors = orderToCoordinates(order);
    return update_seats(coors, RESERVED).then(
      response => {
        if (response.status === 200) {
          dispatch(reserveSeats(rooms));
          alert("Reservation Confirmed!");
        }
      }
    );
  };
};

export const cancelReservationAsync = (order) => {
  return (dispatch, getState) => {
    const state = getState().rooms;
    const rooms = updateRoomsWithCanceledReservation(state, order);
    const coors = orderToCoordinates(order);
    return update_seats(coors, AVAILABLE).then(
      response => {
        if (response.status === 200) {
          dispatch(cancelReservation(rooms));
          alert("Reservation Canceled!");
        }
      }
    );
  };
};