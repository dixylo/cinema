const INIT_ROOMS = 'INIT_ROOMS';
const UPDATE_SEAT = 'UPDATE_SEAT';
const RESERVE_SEATS = 'RESERVE_SEATS';
const RESERVED = 'reserved';
const SELECTED = 'selected';
const AVAILABLE = 'available';

export default function rooms (state, action) {
  if (!state) {
    state = { rooms: [] }
  }

  const { rooms } = state;
  switch (action.type) {
    case INIT_ROOMS:
      return { rooms: action.rooms };
    case UPDATE_SEAT:
      const { room_i, row_i, seat_i } = action.coor;
      let { session } = action.coor;
      return {
        rooms: rooms.map(
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
                      }
                    }
                    return row;
                  }
                )
              };
            }
            return room;
          }
        )
      }
    case RESERVE_SEATS:
      const { roomId } = action.order;
      session = action.order.session;
      const rm_i = parseInt(roomId, 10) - 1;
      const ssn = session;
      const newRooms = {
        rooms: rooms.map(
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
                          if (seat.status[ssn]) {
                            if (seat.status[ssn] === SELECTED) {
                              return { ...seat, status: {...seat.status, [ssn]: RESERVED}};
                            }
                            return seat;
                          }
                          return {...seat, status: {...seat.status, [ssn]: AVAILABLE}};
                        }
                      )
                    }
                  }
                )
              }
            }
            return room;
          }
        )
      };
      const jsonRooms = JSON.stringify(newRooms);
      fetch("https://cinema-react.firebaseio.com/cinema.json", {
        method: 'PATCH',
        body: jsonRooms
      }).then(response => console.log(response.status)).catch(err => console.log(err));
      return newRooms;
    default:
      return state;
  }
}

// action creators
export const initRooms = (rooms) => {
  return { type: INIT_ROOMS, rooms };
};

export const updateSeat = (coor) => {
  return { type: UPDATE_SEAT, coor };
};

export const reserveSeats = (order) => {
  return { type: RESERVE_SEATS, order }
};