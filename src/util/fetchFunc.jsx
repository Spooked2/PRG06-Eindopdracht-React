
async function fetchFunc(endpoint, options) {

    const url = 'http://145.24.223.82:8088/' + endpoint + (options.id ? ('/' + options.id) : '');

    try {

        const response = await fetch(url, {
            method: options.method,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${options.jwt ?? ''}`,
                "Content-Type": "application/json"
            },
            body: options.body ?? null
        });

        const data = await response.json();

        return {
            body: data,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        };

    } catch (error) {

        console.error(error.message);
        return false

    }

}

export default fetchFunc;

