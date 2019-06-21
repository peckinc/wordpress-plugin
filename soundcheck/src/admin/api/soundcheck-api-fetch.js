import { soundcheckApiUrl } from '../environment';

const soundcheckApiFetch = ({ path, method, body }) => {

    const token = localStorage.getItem("jwt");
    const fetchMethod = method ? method : 'GET';

    const soundcheckApiFetchOptions = {
        method: fetchMethod, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        credentials: "omit", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json"
        }
    }


    console.log("using token "+token);

    if (token) {
        soundcheckApiFetchOptions.headers["Authorization"] = "Bearer "+token;
    }

    const apiPath = `${soundcheckApiUrl}${path}`

    let options = soundcheckApiFetchOptions;
    switch (method) {
        case 'PUT':
        case 'POST':
            options.body = JSON.stringify(body);
        default:
            return fetch(apiPath,
                options
            ).then((response) => {
                console.log("fetch response",response);
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
        }

}


export default soundcheckApiFetch;