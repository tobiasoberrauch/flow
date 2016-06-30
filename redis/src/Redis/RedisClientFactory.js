import Redis from "ioredis";

export default class RedisClientFactory {
    createService() {
        Redis.Command.setArgumentTransformer('hmset', function (parameters) {
            if (parameters.length === 2) {
                if (typeof Map !== 'undefined' && parameters[1] instanceof Map) {
                    return [parameters[0]].concat(utils.convertMapToArray(parameters[1]));
                }
                if (typeof parameters[1] === 'object' && parameters[1] !== null) {
                    return [parameters[0]].concat(utils.convertObjectToArray(parameters[1]));
                }
            }
            return parameters;
        });

        Redis.Command.setReplyTransformer('hgetall', function (result) {
            if (Array.isArray(result)) {
                var obj = {};
                for (var i = 0; i < result.length; i += 2) {
                    obj[result[i]] = result[i + 1];
                }
                return obj;
            }
            return result;
        });

        let redis = new Redis();


        return redis;
    }


}