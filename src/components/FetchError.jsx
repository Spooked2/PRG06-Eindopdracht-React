
function FetchError({error}) {

    return (
        <section>

            <h1>Something went wrong!</h1>

            <h2>Status: {error.cause}</h2>

            <p>{error.message}</p>

            <p>Use the navbar to leave this page</p>

        </section>
    );
}

export default FetchError;