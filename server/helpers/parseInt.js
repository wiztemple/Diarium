/* Check the id of every request to see if it can be converted to number */
const parsedInt = id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10));
export default parsedInt;
