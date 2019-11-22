/* eslint-env jquery */

(function () {


    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers : {
                'Authorization': 'Client-ID '
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=`
        }).done(addArticles);


    });

    function addImage(images) {
        let htmlContent = '';
        if (images != null && images.results[0] && images.results.length > 0) {
            let firstImage = images.results[0];
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
