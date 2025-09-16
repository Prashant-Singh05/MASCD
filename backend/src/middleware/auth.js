import jwt from 'jsonwebtoken';

export function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    const err = new Error('Authentication required');
    err.status = 401;
    return next(err);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    const err = new Error('Invalid or expired token');
    err.status = 401;
    return next(err);
  }
}

export function authorize(allowedRoles = []) {
  return (req, _res, next) => {
    if (!req.user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }
    return next();
  };
}
