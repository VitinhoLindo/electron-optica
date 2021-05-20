export default class BinaryInfo {
  constructor() {
    this.constants = {
      map: {
        b:  1,
        kb: 1 << 10,
        mb: 1 << 20,
        gb: 1 << 30,
        tb: Math.pow(1024, 4),
        pb: Math.pow(1024, 5)
      },
      regexp: {
        parseRegExp: /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i,
        formatDecimalsRegExp: /(?:\.0*|(\.[^0]+)0+)$/,
        formatThousandsRegExp: /\B(?=(\d{3})+(?!\d))/g
      }
    }
  }

  /**
   * Convert the given value in bytes into a string or parse to string to an integer in bytes.
   *
   * @param {string|number} value
   * @param {{
   *  case: [string],
   *  decimalPlaces: [number]
   *  fixedDecimals: [boolean]
   *  thousandsSeparator: [string]
   *  unitSeparator: [string]
   *  }} [options] bytes options.
   *
   * @returns {string|number|null}
   */
  bytes(value, options) {
    if (typeof value === 'string') {
      return this.parse(value);
    }

    if (typeof value === 'number') {
      return this.format(value, options);
    }

    return null;
  }

  /**
   * Format the given value in bytes into a string.
   *
   * If the value is negative, it is kept as such. If it is a float,
   * it is rounded.
   *
   * @param {number} value
   * @param {object} [options]
   * @param {number} [options.decimalPlaces=2]
   * @param {number} [options.fixedDecimals=false]
   * @param {string} [options.thousandsSeparator=]
   * @param {string} [options.unit=]
   * @param {string} [options.unitSeparator=]
   *
   * @returns {string|null}
   * @public
   */
  format(value, options) {
    if (!Number.isFinite(value)) {
      return null;
    }

    var mag = Math.abs(value);
    var thousandsSeparator = (options && options.thousandsSeparator) || '';
    var unitSeparator = (options && options.unitSeparator) || '';
    var decimalPlaces = (options && options.decimalPlaces !== undefined) ? options.decimalPlaces : 2;
    var fixedDecimals = Boolean(options && options.fixedDecimals);
    var unit = (options && options.unit) || '';

    if (!unit || !this.constants.map[unit.toLowerCase()]) {
      if (mag >= this.constants.map.pb) {
        unit = 'PB';
      } else if (mag >= this.constants.map.tb) {
        unit = 'TB';
      } else if (mag >= this.constants.map.gb) {
        unit = 'GB';
      } else if (mag >= this.constants.map.mb) {
        unit = 'MB';
      } else if (mag >= this.constants.map.kb) {
        unit = 'KB';
      } else {
        unit = 'B';
      }
    }

    var val = value / this.constants.map[unit.toLowerCase()];
    var str = val.toFixed(decimalPlaces);

    if (!fixedDecimals) {
      str = str.replace(this.constants.regexp.formatDecimalsRegExp, '$1');
    }

    if (thousandsSeparator) {
      str = str.replace(this.constants.regexp.formatThousandsRegExp, thousandsSeparator);
    }

    return str + unitSeparator + unit;
  }

  /**
   * Parse the string value into an integer in bytes.
   *
   * If no unit is given, it is assumed the value is in bytes.
   *
   * @param {number|string} val
   *
   * @returns {number|null}
   * @public
   */
  parse(val) {
    if (typeof val === 'number' && !isNaN(val)) {
      return val;
    }

    if (typeof val !== 'string') {
      return null;
    }

    // Test if the string passed is valid
    var results = this.constants.regexp.parseRegExp.exec(val);
    var floatValue;
    var unit = 'b';

    if (!results) {
      // Nothing could be extracted from the given string
      floatValue = parseInt(val, 10);
      unit = 'b'
    } else {
      // Retrieve the value and the unit
      floatValue = parseFloat(results[1]);
      unit = results[4].toLowerCase();
    }

    return Math.floor(map[unit] * floatValue);
  }
}