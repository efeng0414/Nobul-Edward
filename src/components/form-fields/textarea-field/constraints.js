export const CONSTRAINTS = [
  {
    type: "email",
    regrex:
      "([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)",
    locale: "constraints.email"
  },
  {
    type: "link",
    regrex:
      "(http(s)?:\\/\\/.)?(www.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)",
    locale: "constraints.link"
  },
  {
    type: "phone",
    regrex:
      "[\\.\\-)( ]*([0-9]{3})[\\.\\-)( ]*([0-9]{3})[\\.\\-)( ]*([0-9]{4})",
    locale: "constraints.phone"
  },
  {
    type: "MLS Number",
    regrex: "([a-zA-Z]{1}\\d{7})",
    locale: "constraints.mls"
  }
];
