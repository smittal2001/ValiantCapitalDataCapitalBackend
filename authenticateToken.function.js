const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if (authHeader == null) return res.sendStatus(401)
    
    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }
}