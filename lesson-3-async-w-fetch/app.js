(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,{
            headers : {
                'Authorization': 'Client-ID '
            }
        }).then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=`)
        .then(response => response.json())
        .then(addArticles)
        .catch(e => requestError(e, 'article'));

    });

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }

    function addImage(data) {
        let htmlContent = '';
        if (data != null && data.results[0] && data.results.length > 0) {
            let firstImage = data.results[0];
            htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText} "/>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`;

        } else {
            htmlContent = `<div class="error-no-image">No Images Available</div>`;
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function addArticles(data) {
      if (data != null && data.response.docs && data.response.docs.length > 0) {
            htmlContent = '<ul>'+data.response.docs.map(article =>  `<li class="article">
            <h2><a href="${article.web_url}">"${article.headline.main}"</a></h2>
            <p>${article.snippet}</p> 
            </li>`).join(''+'</ul>');

        } else {
            htmlContent = `<div class="error-no-article">No Articles Available</div>`;
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
})();
