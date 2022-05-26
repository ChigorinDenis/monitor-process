const host = 'http://localhost:8080';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getBlocks: [host, prefix, 'get-blocks'].join('/'),
    getOperations: [host, prefix, 'get-operations'].join('/'),
    getRoles: [host, 'admin', 'get-roles'].join('/'),
    getUsers: [host, 'admin', 'get-users'].join('/'),
    addNewUser: [host, 'admin', 'add-new-user'].join('/'),
    addNewOperation: [host, prefix, 'add-new-operation'].join('/'),
    addNewBlock: [host, prefix, 'add-new-block'].join('/'),
    addNewLaunch: [host, prefix, 'add-new-launch'].join('/'),
    editOperation: [host, prefix, 'save-editing-operation'].join('/'),
    login: [host, 'login'].join('/'),
  }
  return paths[name];
};
