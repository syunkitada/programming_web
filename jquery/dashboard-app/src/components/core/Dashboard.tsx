import data from "../../data";

function Render(input: any) {
  const { Name, ServiceMap, ProjectServiceMap } = data.auth.Authority;

  const tmpProjects = Object.keys(ProjectServiceMap);
  tmpProjects.sort();

  const tmpServices = Object.keys(ServiceMap);
  tmpServices.sort();

  const projectsHtmls = [];
  for (const tmpProject of tmpProjects) {
    projectsHtmls.push(`
        <a class="list-group-item list-group-item-action" href="#">${tmpProject}</a>
        `);
  }

  const projectHtml = `
    <li class="list-group-item list-group-item-action sidebar-item">
      <a class="list-group-item-action" data-toggle="collapse" href="#collapseExample">
        Projects
        <i id="collapseExampleIcon" class="material-icons">chevron_right</i>
      </a>
      <div class="collapse list-group list-group-flush" id="collapseExample" style="padding: 5px;">
        <input id="input-project" class="form-control form-control-sm">
        ${projectsHtmls.join("")}
      </div>
    </li>
    `;

  const servicesHtmls = [projectHtml];

  for (const tmpService of tmpServices) {
    servicesHtmls.push(`
    <li class="list-group-item list-group-item-action sidebar-item">
      <a class="list-group-item-action" href="#">${tmpService}</a>
    </li>
    `);
  }

  const { id } = input;
  $(`#${id}`).html(`
<nav class="navbar navbar-expand-lg navbar-light border-bottom sticky-top bg-white" style="height: 50px; padding: 0px;">
  <a id="menu-toggle" class="border-right" href="#">
    <span class="navbar-toggler-icon"></span>
  </a>

  <a id="navbar-brand" class="navbar-brand border-right mr-auto" href="#">Home</a>

  <div class="dropdown col-auto bg-lignt border-left">
    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${Name}
    </button>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" id="DashboardLogout" href="#">Log out</a>
    </div>
  </div>
</nav>

<!-- Sidebar -->
<div class="border-right bg-white" id="sidebar-wrapper">
  <ul class="list-group list-group-flush" style="width: 100%;">
    ${servicesHtmls.join("")}
  </ul>
</div>
<!-- /#sidebar-wrapper -->

<div class="bg-white" id="wrapper">
    <!-- Page Content -->
    <div id="page-content-wrapper">

      <div class="container-fluid">
        <h1 class="mt-4">Sample Page</h1>
        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
<p>hoge</p>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>


  `);

  $("#menu-toggle").on("click", function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("toggled");
  });

  $("#header-menu-toggle").on("click", function (e) {
    e.preventDefault();
    $("#header-menu").toggleClass("toggled");
  });

  $("#collapseExample")
    .on("show.bs.collapse", function () {
      $("#collapseExampleIcon").toggleClass("rotate-90");
    })
    .on("shown.bs.collapse", function () {
      $("#input-project").focus();
    })
    .on("hide.bs.collapse", function () {
      $("#collapseExampleIcon").toggleClass("rotate-90");
    });

  $("#DashboardLogout").on("click", function () {
    input.logout();
  });

  return;
}

const index = {
  Render,
};
export default index;
