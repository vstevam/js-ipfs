'use strict'

const print = require('../../utils').print

module.exports = {
  command: 'findpeer <peerID>',

  describe: 'Find the multiaddresses associated with a Peer ID.',

  builder: {},

  handler (argv) {
    console.log('findpeer', argv.peerID)

    argv.ipfs.dht.findpeer(argv.peerID, (err, result) => {
      if (err) {
        throw err
      }

      print(result)
    })
  }
}
