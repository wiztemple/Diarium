const isNumeric = id => !isNaN(parseFloat(id)) && isFinite(id);
export default isNumeric;
