// const host = 'http://localhost:8080';
const host = 'http://25.63.58.40:8081';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getBlocks: [host, prefix, 'get-blocks'].join('/'),
    getLaunches: [host, prefix, 'get-launches'].join('/'),
    getOperations: [host, prefix, 'get-operations-with-blocks'].join('/'),
    getHistoryOperationsByBlock: [host, 'operations', 'get-history-operations', 'by-lunch', 1, 'by-block', 1].join('/'),
    startHistoryOperation: (id, u_id = 1) => ([host, 'operation', 'start-operation', id, 'user', u_id ].join('/')),
    stopHistoryOperation: (id, u_id = 1) => [host, 'operation', 'stop-operation', id, 'user', 1 ].join('/'),
    getRoles: [host, 'admin', 'get-roles'].join('/'),
    getUsers: [host, 'admin', 'get-users'].join('/'),
    addNewUser: [host, 'admin', 'add-new-user-with-role'].join('/'),
    addNewOperation: [host, prefix, 'add-new-operation'].join('/'),
    addNewBlock: [host, prefix, 'add-new-block'].join('/'),
    addNewBlockOperations: [host, prefix, 'add-new-operation-blocks'].join('/'),
    addNewLaunch: [host, prefix, 'add-new-launch'].join('/'),
    editOperation: [host, prefix, 'save-editing-operation'].join('/'),
    login: [host, 'login'].join('/'),
  }
  return paths[name];
};
