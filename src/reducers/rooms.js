// action types
const INIT_ROOMS = 'INIT_ROOMS';
const UPDATE_SEAT = 'UPDATE_SEAT';
const ORDER_SEATS = 'ORDER_SEATS';
const BOOKED = 'booked';
const CHOSEN = 'chosen';
const VACANT = 'vacant';

// reducer
export default function rooms (state, action) {
  if (!state) {
    state = { rooms: [] }
  }

  const { rooms } = state;
  switch (action.type) {
    case INIT_ROOMS:
      // Initialize rooms
      return { rooms: action.rooms };
    case UPDATE_SEAT:
      // Update a seat
      const { room_i, row_i, seat_i } = action.coor;
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
                            if (st_i === seat_i) {
                              switch (seat.status) {
                                case BOOKED:
                                  alert('You cannot select a booked seat!');
                                  return seat;
                                case CHOSEN:
                                  return { ...seat, status: VACANT };
                                case VACANT:
                                  return { ...seat, status: CHOSEN };
                                default:
                                  return seat;
                              }
                            }
                            return seat;
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
    case ORDER_SEATS:
      return {
        rooms: rooms.map(
          room => {
            return {
              ...room,
              rows: room.rows.map(
                row => {
                  return {
                    ...row,
                    seats: row.seats.map(
                      seat => {
                        if (seat.status === CHOSEN) {
                          return { ...seat, status: BOOKED };
                        }
                        return seat;
                      }
                    )
                  }
                }
              )
            }
          }
        )
      };
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

export const orderSeats = (roomId) => {
  return { type: ORDER_SEATS, roomId }
};