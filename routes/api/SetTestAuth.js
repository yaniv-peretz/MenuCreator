export default function checkAuth(req, res, next) {
    req.session.rest_id = 2;
    req.session.auth = true;
    next()
  };