(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText)
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

        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID ')
        unsplashRequest.onload = addImage;

        unsplashRequest.send()
        function addArticles() {
            const data = JSON.parse(this.responseText);

          if (data != null && data.response.docs && data.response.docs.length > 0) {
                htmlContent = '<ul>'+data.response.docs.map(article =>  `<li class="article">
                <h2><a href="${article.web_url}">"${article.headline.main}"</a></h2>
                <p>${article.snippet}</p> 
                </li>`).join(''+'</ul>');

            } else {
                htmlContent = `<div class="error-no-article">No Articles Available</div>`;
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
            debugger;
        }
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=`);
        articleRequest.send();

    });

})();
