// const host = 'http://25.63.58.40:8081';
const host = 'http://localhost:8081';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getBlocks: [host, prefix, 'get-blocks'].join('/'),
    getLaunches: [host, prefix, 'get-launches'].join('/'),
    getOperations: [host, prefix, 'get-operations-with-blocks'].join('/'),
    getHistoryOperationsByBlock: (id_launch, id_block) => ([host, 'operations', 'get-history-operations', 'by-lunch', id_launch, 'by-block', id_block].join('/')),
    getHistoryOperationsByLaunch: (id_launch) => ([host, 'operations', 'get-history-operations', 'by-launch', id_launch].join('/')),
    getBlocksByLaunch: (id) => ([host, prefix, 'get-blocks-by-launch', id].join('/')),
    startHistoryOperation: (id, u_id = 1) => ([host, 'operation', 'start-operation', id, 'user', u_id ].join('/')),
    stopHistoryOperation: (id, u_id = 1) => [host, 'operation', 'stop-operation', id, 'user', u_id ].join('/'),
    getRoles: [host, 'admin', 'get-roles'].join('/'),
    getUsers: [host, 'admin', 'get-users'].join('/'),
    addNewUser: [host, 'admin', 'add-new-user-with-role'].join('/'),
    addNewOperation: [host, prefix, 'add-new-operation'].join('/'),
    addNewBlock: [host, prefix, 'add-new-block'].join('/'),
    addNewBlockOperations: [host, prefix, 'add-new-operation-blocks'].join('/'),
    addNewOperationError: [host, 'operation', 'add-new-operation-error'].join('/'),
    addNewLaunch: [host, prefix, 'add-new-launch'].join('/'),
    addNewLaunchWithBlocks: [host, prefix, 'add-new-launch-with-blocks '].join('/'),
    addNewLaunchBlock: [host, prefix, 'add-new-launch-block'].join('/'),
    addNewErrorGuide: (id_operation) => ([host, prefix, 'save-new-error-guide', id_operation].join('/')),
    getErrorGuide: (id_operation) => ([host, prefix, 'get-error-guides-for-one-operations', id_operation].join('/')),
    editOperation: [host, prefix, 'save-editing-operation'].join('/'),
    login: [host, 'login'].join('/'),
  }
  return paths[name];
};
