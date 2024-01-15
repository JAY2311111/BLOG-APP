import crypto from 'crypto';

const KEY = 'jay@123456687!@44778858'; // Replace with a strong, secure key
const IV = crypto.randomBytes(16); // Generate a random initialization vector

export const encrypt = (value) => {
    try {
        var crypto = require('crypto');
        var mykey = crypto.createCipher('aes-128-cbc', KEY);
        var mystr = mykey.update(value, 'utf8', 'base64')
        mystr += mykey.final('base64');
        return mystr;
    }
    catch(err){
        console.log(err)
        return '';
    }
};

export const decrypt = (value) => {

    try {
        var crypto = require('crypto');
        var mykey = crypto.createDecipher('aes-128-cbc', KEY);
        var mystr = mykey.update(value, 'base64', 'utf8')
        mystr += mykey.final('utf8');
        return mystr;
    } catch {
        return '';
    }

};


