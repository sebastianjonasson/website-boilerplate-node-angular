function stackOverflowDataService($http, $q) {
    var stackOverflowDataService = {},
        answersCache;

    stackOverflowDataService.getData = function() {
        return $http.get('/stackoverflow/items')
        	.then(function(answers) {
        		answersCache = answers;
        		return answers;
        	})
    }

    stackOverflowDataService.getProfile = function() {
        return $http.get('/stackoverflow/profile');
    }

    stackOverflowDataService.getAnswer = function(id) {
    	console.log("enters");
        var answer;
        console.log(answersCache)
        angular.forEach(answersCache.data.items, function(a) {
        	console.log(a);
        	if(a.answer_id == id) {
        		console.log("has match");
        		answer = a;
        	}
        })
        return answer;
    };

    var activity = [
    {
      "tags": [
        "angularjs",
        "preloader"
      ],
      "score": 0,
      "post_id": 28761428,
      "creation_date": 1425028942,
      "activity_type": "answer_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/28761240/good-pattern-for-a-loader-in-angular-app/28761428#28761428",
      "description": "Instead of broadcasting the events yourself you can take advantage of the start and finish events that the route provider are throwing apon view-change.\n\nAngular router ($route)\n\n...",
      "title": "Good pattern for a loader in Angular app?",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 28760641,
      "creation_date": 1425026782,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/28760641/navigate-problems-with-angular-js#comment45801500_28760641",
      "description": "Please provide some code. At least from your stateProvider and the link.",
      "title": "Navigate problems with Angular.js",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 28730512,
      "creation_date": 1424935230,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/28729374/query-mongoose-multiple-models/28730512#comment45757372_28730512",
      "description": "That&#39;s strange. You can try the findOne then. I&#39;ll update my example.",
      "title": "Query mongoose multiple models",
      "api_site_parameter": "stackoverflow"
    },
    {
      "tags": [
        "javascript",
        "angularjs",
        "node.js",
        "mongodb",
        "mongoose"
      ],
      "score": 0,
      "post_id": 28730512,
      "creation_date": 1424901673,
      "activity_type": "answer_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/28729374/query-mongoose-multiple-models/28730512#28730512",
      "description": "Seems kind of straight forward. But I'm guessing that the example below is what you're looking for.\n\nexports.createInv = function (req, res) {\n    Invoice.create({\n        employee : ...",
      "title": "Query mongoose multiple models",
      "api_site_parameter": "stackoverflow"
    },
    {
      "creation_date": 1421394108,
      "activity_type": "badge_earned",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/help/badges/83/fanatic",
      "description": "Visited the site each day for 100 consecutive days. (Days are counted in <a href=\"http://en.wikipedia.org/wiki/Coordinated_Universal_Time\" rel=\"nofollow\">UTC</a>.)",
      "title": "Fanatic",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27941588,
      "creation_date": 1421242266,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27941588/nginx-not-working-properly-after-update#comment44283545_27941588",
      "description": "Let us <a href=\"http://chat.stackoverflow.com/rooms/68815/discussion-between-cbass-and-john-doe\">continue this discussion in chat</a>.",
      "title": "Nginx not working properly after update",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27941588,
      "creation_date": 1421235802,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27941588/nginx-not-working-properly-after-update#comment44279893_27941588",
      "description": "Is that the one you will be running? Because like you two installations of nginx right now. Try sudo /usr/share/nginx and see if you instance is running.",
      "title": "Nginx not working properly after update",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27941588,
      "creation_date": 1421235194,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27941588/nginx-not-working-properly-after-update#comment44279538_27941588",
      "description": "try whereis nginx",
      "title": "Nginx not working properly after update",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27941588,
      "creation_date": 1421234236,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27941588/nginx-not-working-properly-after-update#comment44279046_27941588",
      "description": "Are you sure you have a path for nginx?",
      "title": "Nginx not working properly after update",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27922152,
      "creation_date": 1421157155,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27922152/phantomjs-doesnt-load-images-when-rendering-pdf-from-html#comment44244262_27922152",
      "description": "Well, I did add a timeout which didn&#39;t work. Even tried with 10secs before rendering. But I feel like onLoadFinished should do the job. Which it doesn&#39;t.",
      "title": "PhantomJS doesn&#39;t load image(s) when rendering PDF from HTML",
      "api_site_parameter": "stackoverflow"
    },
    {
      "tags": [
        "javascript",
        "node.js",
        "phantomjs"
      ],
      "score": 1,
      "post_id": 27922152,
      "creation_date": 1421151898,
      "activity_type": "question_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27922152/phantomjs-doesnt-load-images-when-rendering-pdf-from-html",
      "description": "Node.js is calling a Phantomjs script which is loading HTML-content and renders html and css fine. Everything works in the browser, but when the script generates the PDF the image doesn't show in the ...",
      "title": "PhantomJS doesn&#39;t load image(s) when rendering PDF from HTML",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27879568,
      "creation_date": 1420996802,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27879568/casting-a-mongodb-document-to-a-strongly-typed-class#comment44180662_27879568",
      "description": "Why don&#39;t you take the user-document as parameter in the constructor?",
      "title": "Casting a MongoDB document to a strongly typed class",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27888063,
      "creation_date": 1420986450,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27888063/ui-router-state-params-in-child-state-when-parent-abstract#comment44177203_27888063",
      "description": "If you only need to retrieve the id from the url in your controller you dont need to user the params-property",
      "title": "UI-Router: state params in child state when parent abstract",
      "api_site_parameter": "stackoverflow"
    },
    {
      "creation_date": 1420795848,
      "activity_type": "badge_earned",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/help/badges/13/yearling",
      "description": "Active member for a year, earning at least 200 reputation",
      "title": "Yearling",
      "api_site_parameter": "stackoverflow"
    },
    {
      "creation_date": 1420795620,
      "activity_type": "badge_earned",
      "account_id": 2221511,
      "link": "http://meta.stackoverflow.com/help/badges/13/yearling",
      "description": "Active member for a year, earning at least 200 reputation",
      "title": "Yearling",
      "api_site_parameter": "meta.stackoverflow"
    },
    {
      "post_id": 27826462,
      "creation_date": 1420668274,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27826462/create-html-element-with-jade-via-angular-binding#comment44064888_27826462",
      "description": "myelement(ng-bind=&quot;myValue&quot;) ?",
      "title": "Create html element with jade via angular binding",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27829091,
      "creation_date": 1420668199,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27829091/node-js-mongodb-error-404-not-found#comment44064850_27829091",
      "description": "Please provide some code. Preferably home/ladessa/files/MelhoraCidade/ws/mcapp/app.js:30:15.",
      "title": "Node.js &amp; MongoDB - error 404 -not found",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27828057,
      "creation_date": 1420667973,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27828057/how-can-i-show-a-full-screen-view-with-angulars-ui-router#comment44064749_27828057",
      "description": "What about binding it to a $rootScope value like $rootScope.fullscreen? And then &lt;div ng-if=&quot;fullscreen&quot; ng-include=&quot;&#39;/views/topbar.html&#39;&quot;&gt;&lt;/div&gt;. It&#39;s a bit ugly. But I guess it will work. Even better if you have values that can determine if the it should be fullscreen. Then you could use that in you ngIf-expression.",
      "title": "How can I show a full screen view with angular&#39;s ui-router?",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27658940,
      "creation_date": 1419608010,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27658940/angularjs-async-http-post-update-scope-data#comment43733540_27658940",
      "description": "please provide some code.",
      "title": "angularjs async http post update scope data",
      "api_site_parameter": "stackoverflow"
    },
    {
      "tags": [
        "node.js",
        "sockets",
        "websocket",
        "socket.io"
      ],
      "score": 1,
      "post_id": 27655618,
      "creation_date": 1419588471,
      "activity_type": "answer_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27655352/sending-a-message-to-single-socket-in-node-js-and-socket-io/27655618#27655618",
      "description": "Basically this is what you need.     \n\nio.on('connection', function(socket){\n  socket.emit('messagetype', \"message\");\n});\n\n\nIt's well documented at socketio-docs\n",
      "title": "Sending a message to single socket in node.js and socket.io",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27639933,
      "creation_date": 1419439989,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27639933/why-is-there-uncaught-syntaxerror-when-i-do-http-post#comment43698620_27639933",
      "description": "Is authurl a strong?",
      "title": "Why is there &quot;Uncaught SyntaxError&quot; when I do $http.post({ })?",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27582637,
      "creation_date": 1419097715,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27582112/mongoose-update-multiple-documents/27582637#comment43589896_27582637",
      "description": "Yes, this is only the query to find them. You will have to add your queryobject that defines what should be updated, and then, as you mentioned in your question, you will have to add {multi:true}",
      "title": "Mongoose update multiple documents",
      "api_site_parameter": "stackoverflow"
    },
    {
      "tags": [
        "javascript",
        "node.js",
        "mongodb",
        "mongoose",
        "insert-update"
      ],
      "score": 1,
      "post_id": 27582637,
      "creation_date": 1419096886,
      "activity_type": "answer_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27582112/mongoose-update-multiple-documents/27582637#27582637",
      "description": "If you have multiple ids that you want to match you can use the keywork $in which checks if there's any matches in the array. Now that you also have multiple properties that you want to check you can ...",
      "title": "Mongoose update multiple documents",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27580180,
      "creation_date": 1419096422,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27579455/mongodb-delete-subdocument/27580180#comment43589516_27580180",
      "description": "You can basically use the same query, you will have to $unset the testArray.",
      "title": "Mongodb delete subdocument",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27580180,
      "creation_date": 1419087049,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27579455/mongodb-delete-subdocument/27580180#comment43586945_27580180",
      "description": "What version of mongodb are you running? It worked fine when i tried it. I Update med answer to display my queries.",
      "title": "Mongodb delete subdocument",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27580180,
      "creation_date": 1419083202,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27579455/mongodb-delete-subdocument/27580180#comment43585993_27580180",
      "description": "DB.collection.update(query, updateQuery)",
      "title": "Mongodb delete subdocument",
      "api_site_parameter": "stackoverflow"
    },
    {
      "tags": [
        "mongodb",
        "spring-data-mongodb"
      ],
      "score": 1,
      "post_id": 27580180,
      "creation_date": 1419077977,
      "activity_type": "answer_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27579455/mongodb-delete-subdocument/27580180#27580180",
      "description": "I recently had the same problem where I had to remove a nested subarray. In the query you need to identify the exact object that you want to remove, and then in your update query you can use the $ ...",
      "title": "Mongodb delete subdocument",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27566763,
      "creation_date": 1419009642,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27566647/mongodb-cant-append-to-array-using-string-field-name/27566763#comment43567083_27566763",
      "description": "You should probably look in to mongoose save method instead. Se the mongoose docs.",
      "title": "Mongodb: Can&#39;t append to array using string field name",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27566763,
      "creation_date": 1419009021,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27566647/mongodb-cant-append-to-array-using-string-field-name/27566763#comment43566772_27566763",
      "description": "Sorry, now I can see that the NetworkRequest doesn&#39;t have an Id. Which makes the push extremely hard. But I don&#39;t understad why NetworkRequest is an array. You don&#39;t have anything that indetifies it.",
      "title": "Mongodb: Can&#39;t append to array using string field name",
      "api_site_parameter": "stackoverflow"
    },
    {
      "post_id": 27566763,
      "creation_date": 1419007002,
      "activity_type": "comment_posted",
      "account_id": 2221511,
      "link": "http://stackoverflow.com/questions/27566647/mongodb-cant-append-to-array-using-string-field-name/27566763#comment43565667_27566763",
      "description": "Do you have the id for the networkrequest you want to push into?",
      "title": "Mongodb: Can&#39;t append to array using string field name",
      "api_site_parameter": "stackoverflow"
    }
  ];

    stackOverflowDataService.getActivity = function() {
        var deffered = $q.defer(),
            datas = {},
            activityLables = [],
            acitivityData = [];

    
        angular.forEach(activity, function(a) {
                if(datas.hasOwnProperty(a.activity_type)) {
                    datas[a.activity_type]++;
                } else {
                    datas[a.activity_type] =1;
                }
        })
        angular.forEach(datas, function(key, value) {
            activityLables.push(value);
            acitivityData.push(key);
        })
        var a = {
            labels: activityLables,
            data: acitivityData
        };
        deffered.resolve(a);
        console.log(a);

        return deffered.promise;
    }


    return stackOverflowDataService;
}