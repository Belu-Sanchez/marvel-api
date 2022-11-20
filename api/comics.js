const baseUrl = `https://gateway.marvel.com/v1/public`;
const apiKey = '26a7a8acd5fe326ac4725819538ebf98';
const apiPrivate = '36e9d123cce0e5998a27a9394da7867691023eb9';



const getComics = async (offset, orderBy, orderType) => {
    const response = await fetch(`${baseUrl}/${orderType}?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data;
}
