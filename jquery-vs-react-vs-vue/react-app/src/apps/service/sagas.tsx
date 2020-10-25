import { put, takeEvery } from "redux-saga/effects";

import actions from "../../actions";
import logger from "../../lib/logger";
import store from "../../store";

function* post(action) {
  const serviceState = Object.assign({}, store.getState().service);
  const { projectName, serviceName, index, location } = serviceState;
  const { isSync, items, fieldMap } = action.payload;

  console.log("DEBUG TODO post init", index, action.type, location);
  if (!location) {
    logger.warning("Invalid location", location);
    return;
  }

  let payload: any = null;
  let result = {};

  switch (action.type) {
    case "SERVICE_GET_INDEX":
      if (serviceState.projectName) {
        payload = {
          projectName: serviceState.projectName,
          queries: [
            {
              Data: JSON.stringify({
                Name: serviceState.serviceName,
              }),
              Name: "GetProjectServiceDashboardIndex",
            },
          ],
          serviceName: serviceState.serviceName,
          stateKey: "index",
        };
      } else {
        payload = {
          projectName: serviceState.projectName,
          queries: [
            {
              Data: JSON.stringify({
                Name: serviceState.serviceName,
              }),
              Name: "GetServiceDashboardIndex",
            },
          ],
          serviceName: serviceState.serviceName,
          stateKey: "index",
        };
      }
      if (serviceState.initLocation && location.DataQueries) {
        const queries: any[] = [];
        const tmpData = Object.assign(
          {},
          location.Params,
          location.SearchQueries
        );
        const data = JSON.stringify(tmpData);
        for (let i = 0, len = location.DataQueries.length; i < len; i++) {
          queries.push({
            Data: data,
            Name: location.DataQueries[i],
          });
        }
        payload.queries = payload.queries.concat(queries);
      }

      switch (serviceState.serviceName) {
        case "Home":
          result = {
            ResultMap: {
              GetServiceDashboardIndex: {
                Data: {
                  Index: {
                    DefaultRoute: {
                      Path: ["Home"],
                    },
                    View: {
                      Name: "Home",
                      Kind: "Msg",
                    },
                  },
                },
              },
            },
          };
          break;
        case "TablePage":
          const samples: any[] = [];
          for (let i = 0; i < 100000; i++) {
            samples.push({ Name: `hoge${i}`, Region: "piyo", Status: "ok" });
          }
          result = {
            ResultMap: {
              GetServiceDashboardIndex: {
                Data: {
                  Index: {
                    DefaultRoute: {
                      Path: ["TablePage"],
                    },
                    View: {
                      Name: "TablePage",
                      Kind: "Table",
                      DataQueries: ["GetTablePage"],
                      DataKey: "Samples",
                      Columns: [
                        { Name: "Name", IsSearch: true },
                        { Name: "Region" },
                        { Name: "Status" },
                      ],
                    },
                  },
                  Samples: samples,
                },
              },
            },
          };
          break;
        case "GraphPage":
          let metricsPage = {};
          let metricsGroups: any[] = [];
          for (let i = 0; i < 3; i++) {
            let metrics: any[] = [];
            for (let j = 0; j < 10; j++) {
              let values: any[] = [];
              for (let k = 0; k < 10; k++) {
                values.push({
                  time: k,
                  key1: k * 2,
                  key2: k * 2,
                  key3: k * 2,
                });
              }
              metrics.push({
                Name: `metric${j}`,
                Values: values,
                Keys: ["key1", "key2", "key3"],
              });
            }
            metricsGroups.push({
              Name: `group${i}`,
              Metrics: metrics,
            });
          }
          metricsPage["MetricsGroups"] = metricsGroups;
          result = {
            ResultMap: {
              GetServiceDashboardIndex: {
                Data: {
                  Index: {
                    DefaultRoute: {
                      Path: ["GraphPage"],
                    },
                    View: {
                      Name: "GraphPage",
                      Kind: "View",
                      DataKey: "MetricsPage",
                      PanelsGroups: [
                        {
                          Name: "Metrics",
                          Kind: "MetricsGroups",
                          DataKey: "MetricsGroups",
                        },
                      ],
                    },
                  },
                  MetricsPage: metricsPage,
                },
              },
            },
          };
          break;
      }

      console.log("DEBUG result", result, serviceState.serviceName);

      yield put(
        actions.service.servicePostSuccess({
          action,
          payload,
          result,
          websocket: null,
        })
      );
      break;

    case "SERVICE_GET_QUERIES":
      if (location.DataQueries) {
        const queries: any[] = [];
        const syncQueryMap: any[] = [];
        const queryData = Object.assign(
          {},
          location.Params,
          location.SearchQueries
        );
        const data = JSON.stringify(queryData);

        for (let i = 0, len = location.DataQueries.length; i < len; i++) {
          queries.push({
            Data: data,
            Name: location.DataQueries[i],
          });
        }
        payload = {
          isSync,
          projectName: projectName,
          serviceName: serviceName,
          queries: queries,
          stateKey: "index",
          syncQueryMap,
        };
      }

      switch (serviceState.serviceName) {
        case "TablePage":
          result = {
            GetTablePage: {
              Data: {
                Samples: [],
              },
            },
          };
          break;
      }
      console.log("DEBUG tabledata", result);

      yield put(
        actions.service.servicePostSuccess({
          action,
          payload,
          result,
          websocket: null,
        })
      );
      break;

    case "SERVICE_SUBMIT_QUERIES":
      console.log("DEBUG TODO submitqueries", index);
      if (index && index.SubmitQueries) {
        const queries: any[] = [];
        const tmpQueryData = Object.assign({}, location.params);
        for (const key of Object.keys(fieldMap)) {
          const field = fieldMap[key];
          tmpQueryData[key] = field.value;
        }

        let queryData;
        if (items && items.length > 0) {
          const specs: any[] = [];
          for (let i = 0, len = items.length; i < len; i++) {
            specs.push({
              Spec: Object.assign({}, tmpQueryData, items[i]),
            });
          }
          queryData = {
            Specs: JSON.stringify(specs),
          };
        } else {
          queryData = tmpQueryData;
        }

        const data = JSON.stringify(queryData);
        for (let i = 0, len = index.SubmitQueries.length; i < len; i++) {
          queries.push({
            Data: data,
            Name: index.SubmitQueries[i],
          });
        }

        payload = {
          projectName: projectName,
          serviceName: serviceName,
          queries: queries,
          stateKey: "index",
        };
      }

      break;
  }

  return {};
}

function* watchGetIndex() {
  yield takeEvery(actions.service.serviceGetIndex, post);
}

function* watchGetQueries() {
  yield takeEvery(actions.service.serviceGetQueries, post);
}

function* watchSubmitQueries() {
  yield takeEvery(actions.service.serviceSubmitQueries, post);
}

export default {
  watchGetIndex,
  watchGetQueries,
  watchSubmitQueries,
};
