export default function checkAuth(req, res, next) {
    req.session.rest_id = 100;
    req.session.auth = true;
    next()
  };