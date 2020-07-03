import { parseISO } from "date-fns";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

function formatDate(dateInISO) {
  var inputDate = format(parseISO(dateInISO), "dd-MMMM-yyyy");
  var todaysDate = format(new Date(), "dd-MMMM-yyyy");
  var d = new Date();
  d.setDate(d.getDate() - 1);

  var yesterdaysDate = format(d, "dd-MMMM-yyyy");
  if (inputDate == todaysDate) {
    return (
      "dnes " +
      format(parseISO(dateInISO), "HH:mm", {
        locale: sk
      })
    );
  } else if (inputDate == yesterdaysDate) {
    return (
      "včera " +
      format(parseISO(dateInISO), "HH:mm", {
        locale: sk
      })
    );
  }
  return format(parseISO(dateInISO), "d. MMMM yyyy, HH:mm", {
    locale: sk
  });
}
export default formatDate;

export function formatDateToTime(dateInISO) {
  return format(parseISO(dateInISO), "HH:mm", {
    locale: sk
  });
}
