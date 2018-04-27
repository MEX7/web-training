export async function gcrList(params) {
    return request(`${Config.api.hrefPub}/gcr/list?${stringify(params)}`);
}