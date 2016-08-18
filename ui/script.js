function loadData(){
  $.ajax({
    url: "http://localhost:9001/module/jirator/",
    type: "GET",
    dataType: "jsonp",
    format: "json",
    jsonpCallback: "jsonpCallback",

    success: function(result){
      onDataLoaded(JSON.stringify(result));
    },
    error: function(xhr, textStatus, errorThrown){
       console.log('request failed: ' + errorThrown);
    }
  });
}

function onDataLoaded(jsonData){
    var dataObject = JSON.parse(jsonData);
    //var dataObject = [{"reporter": "larn", "status": "In Development", "summary": "Test out Artifactory", "due_date": "2016-08-18", "assignee": "ckra", "description": "Play around with Artifactory."}, {"reporter": "camu", "status": "Open", "summary": "RIO: Thursday 25 Aug. remove Rio promo banner and Rio sektion incl.editorial push", "due_date": "2016-08-25", "assignee": "larn", "description": "RIO: Thursday 25 Aug. remove Rio promo banner and Rio sektion incl.editorial push"}, {"reporter": "camu", "status": "Open", "summary": "Vuelta: Monday 22 AUG. insert promo banner on sport app front page", "due_date": "2016-08-22", "assignee": "larn", "description": "Vuelta: Monday 22 AUG. insert promo banner on sport app front page.\r\n\r\nBanner is attached please ask MAVE if questions to banner."}]

    makeTimeline(dataObject);
}

$(document).ready(function() {
    loadData();
});

/////////////// TIMELINE STUFF ///////////////////////

var TIMELINE_ELEMENT_WIDTH = 300;

function makeTimeline(data){
    var today = moment().format("YYYY-MM-DD");

    var dates = [];

    for (var i = 0; i < data.length; i++) {
        dates.push(moment(data[i].due_date));
    }

    var month_spread = get_month_spread(today, dates);

    var timeLineDom = "";


    for (var i = 0; i < data.length; i++) {
        timeLineDom += getTimeElementDom(today, dates[i], month_spread.latest, data[i]);
    }

    $("#timeline_container").append(timeLineDom);
    $("#days_line").append(makeDaysDom(month_spread.latest));
}

function get_month_spread(today, dates){
    var date_spread = {
        dates : [],
        latest : 0
    };

    for (var i = 0; i < dates.length; i++) {
        var days = dates[i].diff(today, 'days');
        date_spread.dates.push(days);

        if(date_spread.latest < days){
            date_spread.latest = days;
        }
    };

    return date_spread;
}

function makeElementEntriesDom(eventData){
    var domString = "";

    domString += '<p>Reporter: <br>' + eventData.reporter + '</p>';
    domString += '<p>Status: <br>' + eventData.status + '</p>';
    domString += '<p>Due Date: <br>' + eventData.due_date + '</p>';
    domString += '<p>Assignee: <br>' + eventData.assignee + '</p>';
    domString += '<p>Summary: <br>' + eventData.summary + '</p>';
    domString += '<p>Description: <br>' + eventData.description + '</p>';

    return domString;
}

function getTimeElementDom(today, date, latestDay, eventData){

    var daysWidth = window.innerWidth / latestDay;
    var days = date.diff(today, 'days');
    var dis_left = daysWidth * (days - 1);

    if(dis_left + TIMELINE_ELEMENT_WIDTH > window.innerWidth){
        dis_left = window.innerWidth - TIMELINE_ELEMENT_WIDTH;
    }

    return '<div style="left:' + dis_left + 'px;width: ' + TIMELINE_ELEMENT_WIDTH + 'px;" class="timeline_element">' + makeElementEntriesDom(eventData) + '</div>';
}

function makeDaysDom(latestDay){
    var domString = "";

    for (var i = 0; i < latestDay; i++) {

        var daysWidth = window.innerWidth / latestDay;
        var dis_left = daysWidth * i;

        if(dis_left + TIMELINE_ELEMENT_WIDTH > window.innerWidth){
            dis_left = window.innerWidth - TIMELINE_ELEMENT_WIDTH;
        }

        domString += '<div style="left:' + dis_left + 'px;width: ' + 50 + 'px;" class="days_line_element"><p>' + (i + 1)+ '</p></div>';
    }

    return domString;
}