export default function compareTime(time1: string, time2: string): number {
  const auxTime1 = time1.split(':');
  const auxTime2 = time2.split(':');

  const totalMinutesTime1 = Number(auxTime1[0]) * 60 + Number(auxTime1[1]);
  const totalMinutesTime2 = Number(auxTime2[0]) * 60 + Number(auxTime2[1]);

  if (totalMinutesTime1 === totalMinutesTime2) {
    return 0;
  }

  if (totalMinutesTime1 > totalMinutesTime2) {
    return 1;
  }

  return -1;
}
