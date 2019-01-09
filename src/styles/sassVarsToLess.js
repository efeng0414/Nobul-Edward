// This loader will simply replace all $something sass-variable with @something less-variables

// TODO: check how can me change this to ES6 without throwing error in some computers (Robbie, Ross)
// export default function(source) {
//   return source.replace(/\$/gi, "@");
// }

module.exports = function(source) {
  return source.replace(/\$/gi, "@");
};
