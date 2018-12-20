var getUsersAD = require('./getUsersAd')

var users = []
var company = []
var department = []

collapseBy = (arr, keyGetter) => {
    let result = []
    arr.forEach(item => {
        const key = keyGetter(item);
        (!result.includes(key) && key) && result.push(key)
    })
    return result
}

groupBy = (list, keyGroup, keyAggregate) => {
    const map = new Map();
    list.forEach((item) => {
        let key = keyGroup(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [keyAggregate(item)]);
        } else {
            collection.push(keyAggregate(item));
        }
    });
    var result = []
    map.forEach((item, key) => result.push({company: key, department: collapseBy(item, item => item) }))
    return result;
}

initialDate = async () => {
    users = await getUsersAD();
    company = collapseBy(users, user => user.company)
    department = groupBy(users, user => user.company, user => user.department)
}

initialDate();

var findUser = (email) => users.find(item => item.email == email) || null

var getBase = () => ({ company, department, users })

module.exports = { getBase, findUser };