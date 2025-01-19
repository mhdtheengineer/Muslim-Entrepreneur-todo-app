export const calculateTimeDifference = (time1: string, time2: string): number => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);
  
  let diff = (hours2 * 60 + minutes2) - (hours1 * 60 + minutes1);
  
  // Handle crossing midnight
  if (diff < 0) {
    diff += 24 * 60;
  }
  
  return diff;
};

export const isCurrentTimeBlock = (startTime: string, endTime: string): boolean => {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
  
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const timeInMinutes = (hours: number, minutes: number) => hours * 60 + minutes;
  const current = timeInMinutes(currentHours, currentMinutes);
  const start = timeInMinutes(startHours, startMinutes);
  const end = timeInMinutes(endHours, endMinutes);
  
  if (start < end) {
    return current >= start && current < end;
  } else {
    // Handle crossing midnight
    return current >= start || current < end;
  }
};
