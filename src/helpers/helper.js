import { history } from "./history";

export const helper = {
  pluck: pluck(),
  isJson: isJson(),
  postJobParams: postJobParams(),
  handleBackClick: handleBackClick(),
  convertDateFormat: convertDateFormat(),
  nFormat: nFormat(),
  slug: makeSlug(),
  redoSlug: redoSlug(),
  dateString: dateString()
};

function isJson() {
  return (data) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }

    return true;
  };
}

function convertDateFormat() {
  return (dateStr) => {
    let month, year, day;

    let date = new Date(dateStr);

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    if (day.toString().length === 1) {
      day = "0" + day;
    }

    month = month.toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  };
}

function postJobParams() {
  return (limit, pageCnt, type, filter, search) => {
    let params = {};

    if (limit) {
      params["limit"] = limit;
    }

    if (pageCnt) {
      params["offset"] = (pageCnt - 1) * limit;
    }

    if (type) {
      params["type"] = type; // Public Status
    }

    if (filter) {
      params["filter"] = filter;
    }

    if (search) {
      params["search"] = search;
    }

    return params;
  };
}

function pluck() {
  return (arr, key) => arr.map((i) => i[key]);
}

function handleBackClick() {
  return () => history.navigate(-1);
}

function nFormat() {
  return (text) => text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeSlug() {
  return (text) => encodeURIComponent(text.toString().toLowerCase().replace(/ /g, "-"));
}

function redoSlug() {
  return (text) =>
    decodeURIComponent(
      text
        .toString()
        .replace("-", " ")
        .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, (s) =>
          s.toUpperCase()
        )
    );
}

function dateString() {

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (date) => {
    date = new Date(date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return day + " " + monthNames[month] + " " + year;
  }
}