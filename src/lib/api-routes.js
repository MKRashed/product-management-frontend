const prefix = "/api";

const suffix = import.meta.env.VITE_APP_ENVIRONMENT !== 'production' ? ".json" : "";

const apiRoutes = {}

function resolveRoute(route, json_suffix) {
    return `${prefix}${route}${json_suffix? suffix:''}`;
}

apiRoutes.appData = () => resolveRoute('/app-data', false);

export default apiRoutes;