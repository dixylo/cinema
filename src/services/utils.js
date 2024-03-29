export const sessionToDateTime = (session) => {
  const date = [session.slice(0, 4), session.slice(4, 6), session.slice(6, 8)].join('-');
  const time = session.slice(8, 10) + ':' + session.slice(10, 12) + ' ' + session.slice(12, 14);
  return { date, time };
};

export const seatIdToIndices = (seatId) => {
  const rowIndex = seatId.charCodeAt(0) - 65;
  const seatIndex = parseInt(seatId.slice(1), 10) - 1;
  return { rowIndex, seatIndex };
};
