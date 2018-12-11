import { load_rooms, reserve_seats } from '../services/api';

const INIT_ROOMS = 'INIT_ROOMS';
const TOGGLE_SEAT = 'TOGGLE_SEAT';
const RESERVE_SEATS = 'RESERVE_SEATS';
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
    return reserve_seats({ rooms }).then(
      response => {
        if (response.status === 200) {
          dispatch(reserveSeats(rooms));
          alert("Reservation Confirmed!");
        }
      }
    );
  };
};