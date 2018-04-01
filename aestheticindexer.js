/* Aesthetic linker js utility which creates cool folder structure index */
/* generates html using nodejs */

const fs = require('fs');
const path = require('path');

const folders = [
  'assets'
];

const btnTypes = [
  'btn-outline-primary',
  'btn-outline-success',
  'btn-outline-warning',
  'btn-outline-danger',
  'btn-outline-info'
]

function base(fname) {return `
<!DOCTYPE html>
<html lang="en">

<!-- Plasmoxy AestheticIndexer generated html index file -->

<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- mobile chrome stuff-->
  <meta name="theme-color" content="#00ffe0">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- STYLES -->
  <link rel="stylesheet" href="/assets/bs/bootstrap.min.css">


  <!-- SCRIPTS -->
  <script src="/assets/jquery.min.js"></script>
  <script src="/assets/bs/bootstrap.min.js"></script>

  <style>

  /* style for AestheticIndexer by Plasmoxy */

  .roundcorners {
      border-radius: 5px;
      background: #0f0f0f;
      padding: 15px;
  }

  /* COLORS */

  .text-cyan {
    color: #00ffe0;
  }

  .bg-cyan {
    background: #00ffe0;
  }

  .blacc {
    color: #0f0f0f;
  }

  .bg-night {
    background: #0f0f0f;
  }

  a {
    color: #00ffe0;
  }
  a:hover {
    color: #ffc107;
  }

  </style>

</head>

<body class="bg-night text-white">

<div id="root" class="container">

  <div id="titleContainer" class="text-center bg-warning roundcorners mt-2 blacc p-2">
    <h1 class="title">`+fname+`</h1>
    <h5>Plasmoxy's AestheticIndexer project folder view</h5>
  </div>


  <div id="projrow" class="row"><!-- main row, let all just stick in here -->
`}

function endBase() { return `
</div> <!-- end projrow -->


<footer>
    <div class="row justify-content-center mt-5 mb-1">
      <div class="card bg-dark text-white px-5">
        <div class="card-body p-1 px-5">
          (C) <a href="https://github.com/Plasmoxy">Plasmoxy</a> 2018
        </div>
      </div>
    </div>
</footer>

</div>
</body>
</html>
`}

function card(target, description) {return `
<div class="col-lg-4 p-3">
  <div class="card bg-dark">
    <div class="card-header">
      <a class="btn btn-outline-warning w-100" href="`+target+`">`+target+`</a>
    </div>
    <div class="card-body">
      `+description+`
    </div>
  </div>
</div>

`}


folders.forEach(function(folder, folderIndex) {

  console.log('PROCESSING: ' + folder);

  let html = base(path.resolve(folder).split(path.sep).pop());


  // first dirs
  fs.readdirSync(folder).forEach(function(file, i) {
    var isDir = fs.lstatSync(folder + path.sep + file).isDirectory();
    if (file != "desc.txt" && file != "index.html" && isDir)
      stuff += card(file, fs.readfileSync(path.resolve(file)))
  });

/*
  // then files
  fs.readdirSync(folder).forEach(function(file, i) {
    var isDir = fs.lstatSync(folder + path.sep + file).isDirectory();
    if (file != "linker.js" && file != "index.html" && !isDir)
      stuff += '<a class="file" ' + 'href="' + file + '">' + file + '</a>';
    stuff += '<br class="nodeBreak">';
    if (i!=0 && i%3 == 0) stuff += '<br class="nodeBreakOrdered">';
    stuff += '\n';
  });
  */

  html += endBase();


  fs.writeFileSync(path.resolve(folder) + '/index.html', html);
});
