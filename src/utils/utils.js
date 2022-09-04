import moment from "moment";

export const transformedDate = (date_created) => moment(date_created).format("DD MMM, YYYY");
export const transformedDateFull = (date_created) => moment(date_created).format("Do MMMM, YYYY");
export const transformedDateWithTime = (date_created) => moment(date_created).format("Do MMM, YYYY h:mm a");

export const parseAndHandleChange = (value, setFieldValue, id) => {
  if (value === "" && typeof value === "string") setFieldValue(id, value);
  else {
    const parsed = parseInt(value, 10);
    if (parsed) {
      setFieldValue(id, parsed);
    }
  }
};

export const toLocaleFixed = (num, n) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: n,
    maximumFractionDigits: n,
  });
};

export const getPaginationData = (structure) => {
  const { total_records, records_per_page } = structure;
  const total_pages = Math.ceil(total_records / records_per_page);
  const pages = [];
  for (let i = 1; i <= total_pages; i++) {
    pages.push(i);
  }
  return { total_pages, pages };
};
