export const parseDeliveryByTime = (deliveryTime) => {
  const deliveryMins =  Number(deliveryTime.split('-')[1].replaceAll(' ','').replace(/min(s{0,1})/,''));
  const expectedDeliveryTime = Date.now() + deliveryMins * 60000;
  
  let hours = new Date(expectedDeliveryTime).getHours();
  const mins = new Date(expectedDeliveryTime).getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  if (hours > 12) { hours -= 12;}
  if (hours === 0) { hours = 12;}
  return hours + ':' + mins + " " + ampm;
}

export const timeToString = ({hr, min}) => {
  let [numHr, numMin] = [Number(hr), Number(min)];
  let time = '';
  if (numHr > 12) time += (numHr - 12);
  if (numHr === 0) time += 12;
  if (numHr < 12 && numHr > 0) time += numHr;
  if (numMin > 0 && numMin < 10) time += ':0' + numMin;
  if (numMin >= 10) time += ':' + numMin;
  if (numHr >= 12) {time += " PM"} else {time += " AM"};
  return time;
};

export const isAvailable = (menuStart, menuEnd, days) => {
  const currHr = new Date().getHours();
  const currMin = new Date().getMinutes();
  const currDay = new Date().getDay();

  const { hr: startHr, min: startMin } = menuStart;
  const { hr: endHr, min: endMin } = menuEnd;
  return currHr * 60 + currMin >= Number(startHr) * 60 + Number(startMin) 
          && currHr * 60 + currMin < Number(endHr) * 60 + Number(endMin)
          && days[currDay] === true;
}

export const timeInMinutes = ({ hr, min }) => {
  return Number(hr) * 60 + Number(min);
};