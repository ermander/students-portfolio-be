// ERROR HANDLERS
const badRequestHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 400) {
      res.status(400).send(err.message)
    }
    next(err)
  } // 400
  
  const notFoundHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 404) {
      console.log(err)
      res.status(404).send(err.message || "Resource not found!")
    }
    next(err)
  } // 404
  
  // catch all
  const genericErrorHandler = (err, req, res, next) => {
    if (!res.headersSent) {
      // checks if another error middleware already sent a response
      console.log(err)
      res.status(err.httpStatusCode || 500).send(err.message)
    }
  }
  
  module.exports = {
    badRequestHandler,
    notFoundHandler,
    genericErrorHandler,
  }
  