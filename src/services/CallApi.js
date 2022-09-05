import axios from "axios";

const HOSTNAME = "https://hporxadminbackend.herokuapp.com" ;
const callPublicApi = (endpoint, method, payload) => {
    const HOSTNAME = "https://hporxadminbackend.herokuapp.com";
    const configaxios = {
        method,
        url: `${HOSTNAME}${endpoint}`,
        data: payload,
        headers: {
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Max-Age": "6000",
            "Access-Control-Allow-Headers": "*",
            // ...authHeaders,
        },
    };
    return new Promise((resolve, reject) => {
        axios(configaxios)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { callPublicApi , HOSTNAME };
