import util from 'util'; // TODO: rm me if not being used

const printOut = (text, obj, skip = false) => {
  if (!skip) {
    console.log(`${text} ==>> ${util.inspect(obj, { depth: null, colors: true })}`);
  }
}

export default printOut;
