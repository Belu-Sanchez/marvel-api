
const results = document.getElementById('comics-results');
const charactersResults = document.getElementById('characters-results');
const searchType = document.getElementById('search-type');
const searchInput   = document.getElementById('search-input');
const controlOrderBy = document.getElementById('control-order-by');
const searchComics = document.getElementById('search-comics');

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params
}
  

//**********************************************/
// COMICS
//**********************************************/

let page = 1;

const loadComics = async () => {
  const params = getParams()

    const comicsResponse = await getComics(
      params.get('offset') || (page - 1) * 20, 
      params.get('orderBy') || 'title',
      params.get('orderType') || 'comics');


    const data = comicsResponse.data;
    const comics = data.results;

    const results = document.getElementById('comics-results');
    results.innerHTML = "";
    const container = document.createElement('div');
    const row = document.createElement('div');
    results.appendChild(container);
    container.appendChild(row);

    container.classList.add('container');
    row.classList.add('row');

    comics.forEach(comic => {

        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardBody = document.createElement('div');
        const col = document.createElement('div');
        const title = document.createElement('h2');

        const titleText = document.createTextNode(comic.title);

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card);
        cardBody.appendChild(title);
        title.appendChild(titleText);
        
        card.classList.add('card');
        cardImg.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        col.classList.add('col-md-2');
        title.classList.add('h6'); 

        row.appendChild(col); 

        cardImg.setAttribute('src', `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`);
        
  
    });

}



//**********************************************/
// PERSONAJES
//**********************************************/
const loadCharacters = async () => {

  const params = getParams()
  const charactersResponse = await getCharacters(
    params.get('offset') || (page - 1) * 20, 
    params.get('orderBy') || 'name',
 params.get('orderType') || 'characters');
  const data = charactersResponse.data
  const characters = data.results
  const charactersResults = document.getElementById('characters-results');
  const container = document.createElement('div');
  const row = document.createElement('div')

  charactersResults.appendChild(container);
  container.appendChild(row);

  container.classList.add('container');


  row.classList.add('row');

  for (const character of characters) {
    const card = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardBody = document.createElement('div');
    const col = document.createElement('div');
    const name = document.createElement('h2');
    const nameText = document.createTextNode(character.name);
    const comics = character.comics;

    card.addEventListener('click', () => {
      loadDetailCharacter(character)
      container.classList.add('d-none');
      
    })

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    col.appendChild(card)
    cardBody.appendChild(name);
    name.appendChild(nameText)

    card.classList.add('card');
    cardImg.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    col.classList.add('col-md-3')
    name.classList.add('h6')

    row.appendChild(col)
    cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )
  }
}




const loadDetailCharacter = (character) => {

  const charactersDetail = document.getElementById('characters-detail-comics');
  charactersDetail.classList.remove('d-none')

  const divImg = document.createElement('div');
  const cardImg = document.createElement('img');
  const divText = document.createElement('div');
  const name = document.createElement('h3');
  const pText = document.createElement('p');

  const textName =  document.createTextNode(character.name);
  const textDescription =  document.createTextNode(
    character.description.length 
    ? `Descripción: ${character.description}`
    : "No hay descripción");
  
  charactersDetail.appendChild(divImg);
  divImg.appendChild(cardImg)
  charactersDetail.appendChild(divText);
  divText.appendChild(name);
  divText.appendChild(pText);

  name.appendChild(textName);
  pText.appendChild(textDescription);

  cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )

  divImg.classList.add('detail');
  divText.classList.add('detail-text');


}



// //**********************************************/
// Formularios
// //**********************************************/


searchComics.addEventListener('submit', (e) => {

  console.log('click')
  e.preventDefault()

  const orderBy = e.target["control-order-by"].value
  const searchType = e.target["search-type"].value
  //const searchInput = e.target["search-input"].value



  // orderBy.querySelector(`option[value="${params.get("order")}"]`)
  // .setAttribute("selected", "selected")

  const params = new URLSearchParams(window.location.search);

  params.set('orderBy', orderBy);
  params.set('orderType', searchType);
  params.set("offset", 20);
  //params.set('searchInput', searchInput);
  window.location.href = window.location.pathname + '?' + params.toString();

  controlOrderBy
  .querySelector(`option [value="${params.get("orderBy")}"]`)
  .setAttribute("selected", "selected")

})


//**********************************************/
// Form filtros
//**********************************************/

const generarOption = ()=> {
  if(searchType.value === 'comics'){
    controlOrderBy.innerHTML = `
    <option value="title">A-Z</option>
    <option value="-title">Z-A</option>
    <option value="-onsaleDate">Más nuevos</option>
    <option value="onsaleDate">Más viejos</option> `

  }
  if(searchType.value === 'characters'){
      controlOrderBy.innerHTML = `
    <option value="name">A-Z</option>
    <option value="-name">Z-A</option> `
  }

};


searchType.addEventListener('change', () => {
  generarOption()
});


const init = () => {
  generarOption()
  const params = new URLSearchParams(window.location.search);
  if (params.get('orderType') ===  'characters') {
      loadCharacters();

  } else {
      loadComics();

  }
};

window.onload = init();


searchInput.addEventListener('change', e => {
 if(e.target.value !== ''){
   document.getElementById('placeholder-id').classList.add('d-none')
 }


})
//**********************************************/
// PAGINADOR
//**********************************************/


const buttons = [
    { 
        text: "<<", 
        class: "btn",
        onClick: () => {
            page = 1;
            loadComics();
        },
    },
    { 
        text: "<",
        class: "btn",
        onClick: () => {
            page = page - 1;
            loadComics();        
        },
    },
    {
        text: "Página actual",
        class: "btn",
    },
    { 
        text: ">",
        class: "btn",
        onClick: () => {
            page = page + 1;
            loadComics();        
        }
    },
    { 
        text: ">>",
        class: "btn",
        onClick: () => {
            page = 400; // DETERMINAR AUTOMATICAMENTE LA ULTIMA PAGINA!!!!!!!!
            loadComics();        
        }
    },
];

const containerPagination = document.getElementById('container-pagination');
const pagination = document.createElement('div');
containerPagination.appendChild(pagination);
pagination.setAttribute('id', 'pagination');
pagination.classList.add('pagination');



    buttons.forEach(button => {
        
        const buttonNode = document.createElement('button');
        const textNode = document.createTextNode(button.text);
        
        buttonNode.appendChild(textNode);
        buttonNode.classList.add(button.class);
    
        buttonNode.addEventListener('click', button.onClick)
    
        pagination.appendChild(buttonNode)
    
    
    });


