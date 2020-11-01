import logger from "../logger";

const locationDataKey = "d";

const dataPathKey = "p";

function getSubPathKey(path) {
    if (path.length > 1) {
        return path.slice(0, path.length - 1).join(".");
    }
    return path[0];
}

function setServiceParams(params) {
    const { projectName, serviceName } = params;
    let pathname = "";
    if (projectName) {
        pathname = "/Project/" + projectName + "/" + serviceName + "/";
    } else {
        pathname = "/Service/" + serviceName + "/";
    }
    window.history.pushState(null, "", pathname);
}

function getServiceParams() {
    const splitedPath = window.location.pathname.split("/");
    if (splitedPath.length < 3) {
        return {
            serviceName: "Home"
        };
    }

    switch (splitedPath[1]) {
        case "Service":
            return {
                serviceName: splitedPath[2]
            };
        case "Project":
            if (splitedPath.length < 4) {
                return {
                    projectName: splitedPath[2],
                    serviceName: "Home"
                };
            }
            return {
                projectName: splitedPath[2],
                serviceName: splitedPath[3]
            };
    }
    return {
        serviceName: "Home"
    };
}

function getServiceState(state) {
    let service: any = null;
    let serviceState = state.service;
    if (serviceState.projectName) {
        service =
            serviceState.projectServiceMap[serviceState.projectName][
                serviceState.serviceName
            ];
    } else {
        service = serviceState.serviceMap[serviceState.serviceName];
    }
    return service;
}

function getDataFromState(state) {
    let service: any = null;
    let serviceState = state.service;
    if (serviceState.projectName) {
        service =
            serviceState.projectServiceMap[serviceState.projectName][
                serviceState.serviceName
            ];
    } else {
        service = serviceState.serviceMap[serviceState.serviceName];
    }
    return service.Data;
}

function getIndexDataFromState(state, index) {
    let service: any = null;
    let serviceState = state.service;
    if (serviceState.projectName) {
        service =
            serviceState.projectServiceMap[serviceState.projectName][
                serviceState.serviceName
            ];
    } else {
        service = serviceState.serviceMap[serviceState.serviceName];
    }
    return service.Data[index.DataKey];
}

function getLocationData() {
    return getLocationJson(locationDataKey);
}

function getLocationJson(key: string) {
    const searchParams = new URLSearchParams(window.location.search);
    let data: any = {};
    if (searchParams.has(key)) {
        const value = searchParams.get(key);
        try {
            data = JSON.parse(String(value));
        } catch {
            logger.warning("Ignored failed parse", value);
        }
    }

    return data;
}

function setLocationData(obj) {
    setLocationJson(locationDataKey, obj, true);
}

function setLocationJson(key, obj, isPush) {
    return new Promise(() => {
        const str = JSON.stringify(obj);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, str);
        const paramsStr = searchParams.toString();
        const link = window.location.pathname + "?" + paramsStr;
        if (isPush) {
            window.history.pushState(null, "", link);
        } else {
            window.history.replaceState(null, "", link);
        }
    });
}

function getIndex(index, path) {
    if (index.Children) {
        for (let i = 0, len = index.Children.length; i < len; i++) {
            const child = index.Children[i];
            if (child.Name !== path[0]) {
                continue;
            }
            path = path.slice(1);
            return getIndex(child, path);
        }
    }

    return index;
}

function setFilterParamsSearch(text) {
    const data = getLocationData();
    if (data.FilterParams) {
        data.FilterParams.Search = text;
    } else {
        data.FilterParams = { Search: text };
    }
    setLocationData(data);
}

function getFilterParamsSearch() {
    const data = getLocationData();
    if (data.FilterParams && data.FilterParams.Search) {
        return data.FilterParams.Search;
    }
    return "";
}

function setSearchParams(obj) {
    const data = getLocationData();
    data.SearchParams = obj;
    setLocationData(data);
}

function getSearchParams() {
    const data = getLocationData();
    return data.SearchParams;
}

export default {
    getDataFromState,
    getFilterParamsSearch,
    getIndex,
    getIndexDataFromState,
    getLocationData,
    getSearchParams,
    getServiceParams,
    getServiceState,
    getSubPathKey,
    dataPathKey,
    setFilterParamsSearch,
    setLocationData,
    setSearchParams,
    setServiceParams
};
