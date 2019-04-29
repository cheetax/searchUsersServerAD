  // Don't commit this file to your public repos. This config is for first-run
  //
  var config = {
    url: 'ldap://172.22.123.3',
    baseDN: 'dc=uc,dc=local',
    pageSize: 3000,
    username: 'svc-1C-server@uc.local',
    password: 'J@6"1MW"qMdY:8Mt+@p,',
    includeDeleted: false,
}

exports.creds = config;