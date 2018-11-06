'use strict'

module.exports = {
  command: 'query <peerID>',

  describe: 'Find the closest Peer IDs to a given Peer ID by querying the DHT.',

  builder: {

  },

  handler (argv) {
    console.log('query')
  }
}
