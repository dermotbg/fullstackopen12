const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Body:', request.body)
  console.log('Path', request.path)
  console.log('------')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError'){
    return response.status(409).json({ error: 'username already taken' })
  } 
  // else if (error.name === 'CastError'){
  //   return response.status(400).send({ error: error.message })
  // }
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }