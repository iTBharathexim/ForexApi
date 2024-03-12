const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var ObjectId = require('mongodb').ObjectID;
const UserModel = require('../modules/user/user.model');
const FacebookTokenStrategy = require('passport-facebook-token');
const RoleBase_SingIn_SingUpModel = require('../modules/RoleBased/role_base_login.model').RoleBase_SingIn_SingUpModel;

module.exports = function (passport) {
    var opts = {};
    let rolebaseddata = ['Buyer Credit Aggregator', 'Insurance', 'CA', 'Auditor']
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        if (rolebaseddata.includes(jwtPayload?.role) == true) {
            RoleBase_SingIn_SingUpModel.find({ _id: jwtPayload._id }, function (err, user) {
                if (err) {
                    var errMsg = {
                        message: 'Unauthorized User For Mission Possible',
                        err: err
                    };
                    return done(errMsg, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        } else {
            UserModel.findUser({ _id: jwtPayload._id }, function (err, user) {
                if (err) {
                    var errMsg = {
                        message: 'Unauthorized User For Mission Possible',
                        err: err
                    };
                    return done(errMsg, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    }));
};
