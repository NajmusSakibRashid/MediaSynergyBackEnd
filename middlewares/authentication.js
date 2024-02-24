const jwt=require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let authHeader = req.headers['authorization'];
  if(authHeader==null && req.query.token)
    authHeader=req.query.token;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

module.exports=authMiddleware;