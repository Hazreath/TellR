/**
 * Middleware de vérification du token API en header Authorization
 * Erreur 401 si problème avec la req/token invalide, forward requête si succès
 * @param req
 * @param res
 * @param next
 */
function tokenVerificationMiddleware(req, res, next) {
    let token = "Bearer " + process.env.REACT_APP_API_TOKEN

    if (req && req.headers && req.headers.Authorization
        && req.headers.Authorization === token) {
        console.log('Token matches : access granted.')
        next()
    } else {
        console.log('Invalid token supplied')
        res.status(401).json({error : 'Invalid token supplied.'})
    }
}

module.exports = {
    tokenVerificationMiddleware
}