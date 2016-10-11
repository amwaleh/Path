$(document).ready(function() {


    var header = [{
        href: "\\",
        tag: "Home"
    }, {
        href: "/createcohort",
        tag: "Cycle"
    }, {
        href: "/applicants",
        tag: "Applicants"
    }, {
        href: "/toolsDescription",
        tag: "Tools"
    }, {
        href: "/candidate",
        tag: "Candidate"
    }, {
        href: "/cycleAnalytics",
        tag: "Analytics"
    }];
    // create nav bar
    var nav = '<nav class="navbar navbar-light bg-faded navbar-fixed-top">' +
        '<div class="container">' +
        '<a class="navbar-brand" href="/"><img src="/images/MainLogo.png" class="logo">Paths</a>' +
        '<div class="pull-right menu">' +
        '<script id="nav-template" type="text/x-handlebars-template">' +
        '{{#each menu}}' +
        '  <a  href={{this.href}}>{{this.tag}}</a>' +
        '{{/each}}' +
        '</script>' +
        '</div>' +
        '</nav>';
    $('body').prepend(nav);

    var source = $('#nav-template').html();
    var template = Handlebars.compile(source);
    var context = {
        menu: header
    }
    var compiledHTML = template(context);
    $('.menu').html(compiledHTML);

    //compile candidate data
    var source = $("#entry-template").html() || '';
    var template = Handlebars.compile(source);
    var context = {
        seedData: data || ''
    };
    var compiledHTML = template(context);
    $('.seed').html(compiledHTML);

    // compile location data
    source = $('#location-template').html() || '';
    template = Handlebars.compile(source);
    var loco = seedLocation.map(function(item) {
        if (item.Location === 'Nigeria') {
            return item
        }
        return null
    });
    context = {
        seed: loco || ''
    };
    compiledHTML = template(context)
    $('.location').html(compiledHTML);

    // compile tools group by current usage
    source = $('#tools-template').html() || '';
    template = Handlebars.compile(source);
    tools = _.chain(tools).groupBy('Source').value();
    context = {
        tool: tools
    };
    compiledHTML = template(context);
    console.log(context)
    $('.tools').html(compiledHTML);

    // Compile chart data
    // var char = chart.seed.js
    source = $('#chart-template').html() || '';
    template = Handlebars.compile(source);
    var keys = [];
    keys = _.keys(chart[0]);
    context = {
        chartData: chart,
        keys: keys
    };
    compiledHTML = template(context);
    $('.chart').html(compiledHTML);


    // actons for adding tool
    $(document).on('click', '.element>button', function() {
        if ($(this).html() == 'remove') {
            $(this).parent().css('display', 'none');
        }
        $(this).html('remove');
        var a = $(this).attr('title')
        $('.app').html($(this).parent());
        $('.description').html(a);

    });

    // add Tool to staging
    $(document).on('click', '.modal-footer>.btn-primary', function() {
        var elem = $('.app').html()
        $grid.packery()
            .append(elem)
            .packery('appended', elem)
            .packery().find('.grid-item').draggable()
        $('#myModal2').modal('hide')
        $("#drop").each(function(index) {
            var list = $(this).find("p").text() + "\n";
            $('.stage').append("<li class='list-group-item'>" + list + "</li>")
        });
    })

    // Packery: initialize Packery

    var $grid = $('.grid').packery({
        itemSelector: '.grid-item',
        // columnWidth helps with drop positioning
        columnWidth: 100
    });

    // make all items draggable
    var $items = $grid.find('.grid-item').draggable();
    // bind drag events to Packery
    $grid.packery('bindUIDraggableEvents', $items);

    function orderItems() {
        var itemElems = $grid.packery('getItemElements');
        $(itemElems).each(function(i, itemElem) {
            $(itemElem).find('p').text(i + 1);
        });
    }
    $grid.on('layoutComplete', orderItems);
    $grid.on('dragItemPositioned', orderItems);
    // activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $(document).on("click", ".test", function() {
        var elem = "<div class='grid-item'></div>"
        $grid.packery()
            .append(elem)
            .packery('appended', elem)
            .packery().find('.grid-item').draggable()
    })

    // navigate to publish page
    $(document).on('click', '.live', function() {
        $('#myModal').modal('hide')
        document.location = "https://boards.greenhouse.io/andela/jobs/476909"
    })

});
