$(document).ready(function() {
  console.log('Ready....');

  $('#searchUser').on('keyup', function(e) {
    //console.log('keypressed');

    // This creates a variable that gives us the value of what we type in
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '7a94f36a356dc68a0bcc',
        client_secret: '50afa0ea202e86dc7fc6f939f70135e8fd60077a'
      }
      // NOTE: ".done() returns a Promise"
    }).done(function(user) {
      //console.log(user);

      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '7a94f36a356dc68a0bcc',
          client_secret: '50afa0ea202e86dc7fc6f939f70135e8fd60077a',
          sort:  'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, value){
          $('#repos').append(`
            <div class="card">
              <div class="card-body row">
                <div class="col-md-7">
                  <strong>${value.name}</strong>: ${value.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-primary">Forks: ${value.forks_count}</span>
                  <span class="badge badge-secondary">Watchers: ${value.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${value.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${value.html_url}" target="_blank" class="badge badge-danger">Repo Page</a>
                </div>

              </div>  <!-- end class="row" -->

            </div>  <!-- end class="well" -->
            `);
        });
      });

      $('#profile').html(
        // NOTE: Template literals are part of the ES6 syntax.
        // It allows you to user multiple lines, insert variables, instead of having
        // to concatenate everything using qoutes.  To do this you need to put in
        // backticks instead.  So you can treat this like a regular HTML file

        // We will use Bootstrap's new Card components for a nice look.
        `
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">${user.name}</h4>
            <div class="row col-md-12">
              <div class="col-md-3" >
                <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap">
                <br>
                <div class = card-body>
                <center><a target="_blank" href="${user.html_url}" class="btn btn-primary">Visit Profile</a></center>
                </div>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-danger">Folllowing: ${user.following}</span>
                <br> <br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                  <li class="list-group-item">${user.bio}</li>
                </ul>
              </div> <!-- end col-md-9 -->
            </div>

          </div>
        </div>
        <br> <br>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `

      )
    });

  });
});
