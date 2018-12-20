
var ActiveDirectory = require('activedirectory2');

var config = {
    url: 'ldap://172.22.123.3',
    baseDN: 'dc=uc,dc=local',
    pageSize: 3000,
    username: 'svc-1C-server@uc.local',
    password: 'J@6"1MW"qMdY:8Mt+@p,',
    includeDeleted: false,
}

const getUsersADAsync = () => new Promise(resolve => {
    var opts = {
        //filter: '(cn=*)',
        //baseDN: 'ou=Users',
        filter: '(&(objectCategory=Person)(objectClass=User)(title=*)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))',
        //filter: '(&(objectCategory=Person)(ou:distinguishedName:=Enterprise)(objectClass=User)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))',
        //filter: '(objectCategory=Person)',
        attributes: [
            'cn',
            'mail',
            'company',
            'telephoneNumber',
            'manager',
            'department',
            'physicalDeliveryOffice',
            'title',
            'member'
        ],
        //includeMembership: ['Personnel',],
        //scope: 'base',
        paged: true
    };

    var ad = new ActiveDirectory(config);
    ad.findUsers(opts, function (err, users) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            resolve([]);
        }
        if ((!users) || (users.length == 0)) console.log('No users found.');
        else {
            console.log(users.length)            
            resolve(users);
        }
    });
})

const getUsersAD = async () => {
    let users = await getUsersADAsync();
    return users;
}



module.exports = getUsersAD;