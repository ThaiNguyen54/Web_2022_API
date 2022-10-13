// import Validator from 'validator'
import * as Utils from '../utils/utilFuncs.js'
import Customer from '../models/customer.js'
import bcrypt  from "bcryptjs";


export function Authenticate (LoginName, Password, callback) {
    try {
        if(!Utils.VariableTypeChecker(LoginName, 'string')){
            return callback(8, "invalid login name", 422, "Your login name is not a string", null);
        }

        if(!Utils.VariableTypeChecker(Password, 'string')){
            return callback(8, 'invalid password', 422, 'Your password is not a string', null);
        }

        Customer.findOne( {LoginName: LoginName}, function (error, customer) {
            if (error) {
                return callback(8, 'Not found', 420, error, null);
            }

            if(customer) {
                bcrypt.compare(Password, customer.Password, function (error, result) {
                    if (result === true) {
                        return callback(null, null, 200, null, customer);
                    }
                    else {
                        return callback(8, 'Wrong Password', 422, null, null);
                    }
                });
            }
            else
            {
                return callback(8, 'unavailable', 404, null, null);
            }
        });
    }
    catch (error) {
        return callback(8, 'authenticate failed', 400, error, null);
    }

}