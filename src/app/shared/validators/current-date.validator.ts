import { ValidatorFn } from "@angular/forms";

export function isCurrenDate(): ValidatorFn {
  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  today.setHours(0)
  return (control) => {
    try {
      const date = new Date(control.value);
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
      return date.getTime() < (today.getTime() - (1000 * 1)) ? { date: true } : null;
    } catch (errr) {
      return { date: true };
    }
  }
}
