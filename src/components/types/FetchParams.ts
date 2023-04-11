export default interface FetchParams {
    url: URL
    options: {
        method: 'POST' | 'GET' | 'PATCH' | 'DELETE'
        headers?: HeadersInit
        body?: BodyInit
    }
    // Reactive values in url for useEffect to track
    reactives: Array<string>
}
