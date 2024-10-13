const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

// Configuración del cliente para obtener el JWK
const client = jwksRsa({
  jwksUri: 'http://localhost:8085/realms/cuaderno-de-lab/protocol/openid-connect/certs',
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

// Middleware para verificar el token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Obtiene el token de la cabecera

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: no se proporcionó token.' });
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido.' });
    }
    req.user = decoded;  // Almacena los datos del usuario en la request
    next();
  });
};

module.exports = authMiddleware;