'use strict'

const Joi = require('joi')

const debug = require('debug')
const log = debug('jsipfs:http-api:dht')
log.error = debug('jsipfs:http-api:dht:error')

exports = module.exports

exports.findPeer = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.string().required()
    }).unknown()
  },
  handler: (request, reply) => {
    const ipfs = request.server.app.ipfs
    const { arg } = request.query

    ipfs.dht.findpeer(arg, (err, res) => {
      console.log('cenas', err, res)
      if (err) {
        return reply({
          Message: err.toString(),
          Code: 0
        }).code(500)
      }

      return reply({
        Path: 'aaa'
      }).code(200)
    })
  }
}

exports.findProvs = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.string().required(),
      'num-providers': Joi.number().integer().default(20)
    }).unknown()
  },
  handler: (request, reply) => {

  }
}

exports.get = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.string().required()
    }).unknown()
  },
  handler: (request, reply) => {
    const ipfs = request.server.app.ipfs
    const { arg } = request.query

    ipfs.dht.get(Buffer.from(arg), (err, res) => {
      if (err) {
        return reply({
          Message: err.toString(),
          Code: 0
        }).code(500)
      }

      return reply([{
        Extra: res.toString(),
        Type: 5
      }]).code(200)
    })
  }
}

exports.provide = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.string().required(),
      recursive: Joi.boolean().default(false)
    }).unknown()
  },
  handler: (request, reply) => {

  }
}

// Check object.js patchAddLink
exports.put = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.array().items(Joi.string()).length(2).required()
    }).unknown()
  },
  parseArgs: (request, reply) => {
    if (!(request.query.arg instanceof Array) ||
      request.query.arg.length !== 2) {
      return reply("Arguments 'key' & 'value' are required").code(400).takeover()
    }

    const error = (msg) => reply({
      Message: msg,
      Code: 0
    }).code(500).takeover()

    if (!request.query.arg[0]) {
      return error('cannot put to the dht with no key')
    }

    if (!request.query.arg[1]) {
      return error('cannot put to the dht with no value')
    }

    try {
      return reply({
        key: request.query.arg[0],
        value: request.query.arg[1]
      })
    } catch (err) {
      log.error(err)
      return error('invalid dht put parameters')
    }
  },
  handler: (request, reply) => {
    const key = request.pre.args.key
    const value = request.pre.args.value
    const ipfs = request.server.app.ipfs

    ipfs.dht.put(Buffer.from(key), Buffer.from(value), (err, res) => {
      if (err) {
        return reply({
          Message: err.toString(),
          Code: 0
        }).code(500)
      }

      return reply({}).code(200)
    })
  }
}

exports.query = {
  validate: {
    query: Joi.object().keys({
      arg: Joi.string().required(),
      recursive: Joi.boolean().default(false)
    }).unknown()
  },
  handler: (request, reply) => {

  }
}
