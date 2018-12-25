export const Url = "https://api.unsplash.com/search/photos";
export const appId = "b6d1a56cc94078ab90d7682a35aa927c24d063cd53fe934192f73f5beadcc06f";

export default (query) => {
    return fetch(`${Url}?query=${query}&client_id=${appId}`)
    .then(response => Promise.all([response, response.json()]))
}