const host = 'http://localhost:8080';
const prefix = 'constructor';

export default {
  getBlocks: () => ([host, prefix, 'get-blocks'].join('/')),
  getRoles: () => ([host, 'admin', 'get-roles'].join('/')),
  getUsers: () => ([host, 'admin', 'get-users'].join('/')),
  addNewUser: () => ([host, 'admin', 'add-new-user'].join('/')),
  login: () => ([host, 'login'].join('/')),
  
};