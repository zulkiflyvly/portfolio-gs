$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=5ed7f95b&s=" + $(".input-keyword").val(),
    success: results => {
      const movies = results.Search;
      let cards = "";
      movies.forEach(m => {
        cards += showCard(m);
      });
      $(".movie-container").html(cards);

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal-detail-button")) {
          $.ajax({
            url: "http://www.omdbapi.com/?apikey=5ed7f95b&i=" + e.target.dataset.imdbid,
            success: m => {
              const movieDetail = showMovieDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            },
            error: e => {
              console.log(e.responeText);
            }
          });
        }
      });
    },
    error: e => {
      console.log(e.responeText);
    }
  });
});

function showCard(m) {
  return ` <div class="col-md-2 my-5">
    <div class="card" >
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show detail</a>
        </div>
    </div>
</div>`;
}

function showMovieDetail(m) {
  return ` <div class="contaner-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">

        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <h4>${m.Title} ${m.Year}</h4>
                </li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}