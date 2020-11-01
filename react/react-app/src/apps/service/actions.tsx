import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const serviceGetIndex = actionCreator<{
    projectName: any;
    serviceName: any;
}>("SERVICE_GET_INDEX");

export const serviceStartWebSocket = actionCreator<{
    action: any;
    payload: any;
}>("SERVICE_START_WEB_SOCKET");
export const serviceWebSocketOnMessage = actionCreator<{
    event: any;
}>("SERVICE_WEB_SOCKET_ON_MESSAGE");
export const serviceWebSocketOnError = actionCreator<{
    event: any;
}>("SERVICE_WEB_SOCKET_ON_ERROR");
export const serviceWebSocketEmitMessage = actionCreator<{
    action: any;
    payload: any;
    result: any;
}>("SERVICE_WEB_SOCKET_EMIT_MESSAGE");

export const serviceStartBackgroundSync = actionCreator(
    "SERVICE_START_BACKGROUND_SYNC"
);
export const serviceStopBackgroundSync = actionCreator(
    "SERVICE_STOP_BACKGROUND_SYNC"
);

export const serviceGetQueries = actionCreator<{
    index: any;
    location: any;
    searchQueries: any;
}>("SERVICE_GET_QUERIES");
export const serviceSubmitQueries = actionCreator<{
    index: any;
    location: any;
    items: any;
    fieldMap: any;
}>("SERVICE_SUBMIT_QUERIES");
export const serviceCloseErr = actionCreator("SERVICE_CLOSE_ERR");
export const serviceCloseGetQueriesTctx = actionCreator(
    "SERVICE_CLOSE_GET_QUERIES_TCTX"
);
export const serviceCloseSubmitQueriesTctx = actionCreator(
    "SERVICE_CLOSE_SUBMIT_QUERIES_TCTX"
);
export const servicePostSuccess = actionCreator<{
    action: any;
    payload: any;
    result: any;
    websocket: any;
}>("SERVICE_POST_SUCCESS");
export const servicePostFailure = actionCreator<{
    action: any;
    payload: any;
    error: any;
}>("SERVICE_POST_FAILURE");
export const serviceSetAction = actionCreator<{
    actionName: any;
}>("SERVICE_SET_ACTION");
