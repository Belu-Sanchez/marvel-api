const getCharacters = async (offset, orderBy, orderType) =>{     

    const response = await fetch(`${baseUrl}/${orderType}?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`);
    const data = await response.json();
    return data
    
}