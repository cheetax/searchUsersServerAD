var getUsersAD = require('./getUsersAd')

var users = []
var usersMap = new Map()
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
    return map;
}

initialDate = async () => {
    users = await getUsersAD();
    company = collapseBy(users, user => user.company)
    companyMap = groupBy(users, user => user.company, user => user)    
    departmentMap = groupBy(users, user => user.company, user => user.department)
    departmentMap.forEach((item, key) => department.push({company: key, department: collapseBy(item, item => item) }))
    companyMap.forEach((item, key) => usersMap.set(key, groupBy(item, user => user.department, user => user)))
}

initialDate();

var findUser = (email) => users.find(item => item.email == email) || null

var getBase = () => ({ company, department, users, usersMap })

module.exports = { getBase, findUser };