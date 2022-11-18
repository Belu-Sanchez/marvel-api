const baseUrl = `https://gateway.marvel.com/v1/public`;
const apiKey = 'ad0c07cf382bdeb7bad248929fa3e0d6';
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';



const getComics = async (offset, orderBy) => {
    const response = await fetch(`${baseUrl}/comics?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data;
}
