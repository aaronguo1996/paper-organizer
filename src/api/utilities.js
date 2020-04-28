export const baseRoute = "http://localhost:5000/"

export const handleFetch = (data) => {
    return data.json()
        .then((body) => {
            if (body.error) {
                console.log("handleFetch error:", body.error);
                return Promise.reject({error: body.error});
            }
            const {...rest} = body;
            return {...rest};
        });
};

export function abortableFetch(request, opts) {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
      abort: () => controller.abort(),
      ready: fetch(request, { ...opts, signal })
    };
}

export function removeItemOnce(arr, cond) { 
    var index = arr.findIndex(cond);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
