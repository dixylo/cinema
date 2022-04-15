import { fetch_data, toggle_seats } from '../services/api';
import { seatIdToIndices } from '../services/utils';

const INIT_ROOMS = 'INIT_ROOMS';
const TOGGLE_SEAT = 'TOGGLE_SEAT';
const RESERVE_SEATS = 'RESERVE_SEATS';
const CANCEL_RESERVATION = 'CANCEL_RESERVATION';
const HIDE_MODAL = 'HIDE_MODAL';
const RESERVED = 'reserved';
const SELECTED = 'selected';
const AVAILABLE = 'available';

export default function rooms (state, action) {
  if (!state) {
    state = {
      rooms: [],
      modal: {
        visibility: false,
        header: '',
        body: '',
        onOk: null
      }
    };
  }

  switch (action.type) {
    case INIT_ROOMS:
      return { ...state, rooms: action.rooms };
    case TOGGLE_SEAT:
      const newRooms = updateRoomsWithToggledSeats(state, action.coor);
      return { ...state, rooms: newRooms};
    case RESERVE_SEATS:
      return { rooms: action.rooms, modal: action.modal };
    case CANCEL_RESERVATION:
      return { rooms: action.rooms, modal: action.modal };
    case HIDE_MODAL:
      return { ...state, modal: action.modal };
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

export const reserveSeats = (rooms, modal) => {
  return { type: RESERVE_SEATS, rooms, modal };
};

export const cancelReservation = (rooms, modal) => {
  return { type: CANCEL_RESERVATION, rooms, modal };
};

export const hideModal = () => {
  return { type: HIDE_MODAL, modal: { visibility: false, header: '', body: '', onOk: null } };
};

// thunk functions
export const fetchRooms = () => (dispatch) => fetch_data('rooms', dispatch, initRooms);

export const reserveSeatsAsync = (order) => {
  return (dispatch, getState) => {
    const state = getState().rooms;
    const rooms = updateRoomsWithReservedSeats(state, order);
    const coors = orderToCoordinates(order);
    return toggle_seats(coors, RESERVED)
      .then(() => {
        const modal = {
          visibility: true,
          header: 'Reservation Confirmed',
          body: 'You have reserved the seat(s) successfully.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(reserveSeats(rooms, modal));
      })
      .catch(ex => console.log(ex.message));
  };
};

export const cancelReservationAsync = (order) => {
  return (dispatch, getState) => {
    const state = getState().rooms;
    const rooms = updateRoomsWithCanceledReservation(state, order);
    const coors = orderToCoordinates(order);
    return toggle_seats(coors, AVAILABLE)
      .then(() => {
        const modal = {
          visibility: true,
          header: 'Reservation Canceled',
          body: 'You have canceled the seat(s) successfully.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(cancelReservation(rooms, modal));
      })
      .catch(ex => console.log(ex.message));
  };
};
