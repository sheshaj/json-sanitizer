function objectSanitizer(obj, isRemoveEmptyArray) {
    if (!Array.isArray(obj)) {
        for (var key in obj) {
            if (!obj[key]) {
                delete obj[key];
            }
            else if (typeof obj[key] === 'object' && !isRemoveEmptyArray) {
                if (Object.keys(obj[key]).length === 0 && !Array.isArray(obj[key])) {
                    delete obj[key];
                }
                else {
                    objectSanitizer(obj[key], isRemoveEmptyArray);
                }
            }
            else if (typeof obj[key] === 'object' && isRemoveEmptyArray) {
                if (obj[key].length === 0 || Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
                else if (Array.isArray(obj[key])) {
                    for (var k of obj[key]) {
                        if (!k) {
                            obj[key].shift();
                        }
                    }
                    if (obj[key].length === 0) {
                        delete obj[key];
                    }
                }
                else {
                    objectSanitizer(obj[key], isRemoveEmptyArray);
                }
            }
        }
    }
    return obj;
}

module.exports = objectSanitizer