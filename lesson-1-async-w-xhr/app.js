(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

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

    form
        .addEventListener('submit', function (e) {
            e.preventDefault();
            responseContainer.innerHTML = '';
            searchedForText = searchField.value;

            const unsplashRequest = new XMLHttpRequest();

            unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
            unsplashRequest.setRequestHeader('Authorization', 'Client-ID 102774a71dda22ec30ac4724bef425375806127558ae7bd1c999a31e7b9e7181')
            unsplashRequest.onload = addImage;

            unsplashRequest.send()

        });

})();
