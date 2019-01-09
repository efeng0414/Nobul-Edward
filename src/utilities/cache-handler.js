import moment from "moment";
import Cookies from "js-cookie";

export const localStorageIsAvailable = () => {
  if (localStorage) {
    try {
      localStorage.setItem("_localstoragetest", "localstoragetestdata");
    } catch (err) {
      return false;
    }
    localStorage.removeItem("_localstoragetest");
    return true;
  }
  return false;
};

export function sessionStorageIsAvailable() {
  if (sessionStorage) {
    try {
      sessionStorage.setItem("_localstoragetest", "localstoragetestdata");
    } catch (err) {
      return false;
    }
    sessionStorage.removeItem("_localstoragetest");
    return true;
  }
  return false;
}

export const checkForCached = name => {
  let item;
  if (localStorageIsAvailable()) {
    let itemIsExpired = moment().isAfter(
      moment(localStorage.getItem(`${name}_expiry`))
    );
    if (!localStorage.getItem(name) || itemIsExpired) {
      item = null;
    } else {
      item = localStorage.getItem(name);
    }
  } else {
    item = Cookies.get(name);
  }
  try {
    return JSON.parse(item);
  } catch (err) {
    return item;
  }
};

export const cacheItem = (name, data, expiry, storeInCookie) => {
  let dataToCache = data;
  if (typeof data !== "string") {
    dataToCache = JSON.stringify(data);
  }
  if (localStorageIsAvailable() && !storeInCookie) {
    //Stringify data if its not a plain string.
    localStorage.setItem(name, dataToCache);
    if (expiry) {
      localStorage.setItem(
        `${name}_expiry`,
        moment()
          .add(expiry, "minutes")
          .toISOString()
      );
    }
  } else {
    if (expiry) {
      Cookies.set(name, dataToCache, { expires: 1 / 24 / 60 * expiry });
    } else {
      Cookies.set(name, dataToCache);
    }
  }
};

export function saveSessionItem(name, data) {
  let dataToCache = data;
  if (typeof data !== "string") {
    dataToCache = JSON.stringify(data);
  }
  if (sessionStorageIsAvailable()) {
    //Stringify data if its not a plain string.
    sessionStorage.setItem(name, dataToCache);
  } else {
    console.log("Session storage is not available!");
  }
}

export function checkForSessionItem(name) {
  let item;
  if (sessionStorageIsAvailable()) {
    if (!sessionStorage.getItem(name)) {
      item = null;
    } else {
      item = sessionStorage.getItem(name);
    }
  }
  try {
    return JSON.parse(item);
  } catch (err) {
    return item;
  }
}

export function clearCachedData() {
  localStorage.clear();
  Cookies.remove("currentUserId");
  Cookies.remove("userType");
}

export const removeCachedItem = itemKey => localStorage.removeItem(itemKey);
