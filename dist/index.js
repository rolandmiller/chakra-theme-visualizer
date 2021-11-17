
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chakra-ui-theme-explorer.cjs.production.min.js')
} else {
  module.exports = require('./chakra-ui-theme-explorer.cjs.development.js')
}
