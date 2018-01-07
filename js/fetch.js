var url;
var title;

var lexicon = {
"afghanistan":"Country","albania":"Country","algeria":"Country","andorra":"Country","angola":"Country","antigua & deps":"Country","argentina":"Country","armenia":"Country","australia":"Country","austria":"Country","azerbaijan":"Country",
"bahamas":"Country","bahrain":"Country","bangladesh":"Country","barbados":"Country","belarus":"Country","belgium":"Country","belize":"Country","benin":"Country","bhutan":"Country","bolivia":"Country","bosnia herzegovina":"Country",
"botswana":"Country","brazil":"Country","brunei":"Country","bulgaria":"Country","burkina":"Country","burundi":"Country","cambodia":"Country","cameroon":"Country","cape verde":"Country","central african rep":"Country","chad":"Country",
"chile":"Country","china":"Country","colombia":"Country","comoros":"Country","congo":"Country","congo {democratic rep}":"Country","costa rica":"Country","croatia":"Country","cuba":"Country","cyprus":"Country","czech republic":"Country",
"denmark":"Country","djibouti":"Country","dominica":"Country","dominican republic":"Country","east timor":"Country","ecuador":"Country","egypt":"Country","el salvador":"Country","equatorial guinea":"Country","eritrea":"Country",
"estonia":"Country","ethiopia":"Country","fiji":"Country","finland":"Country","france":"Country","gabon":"Country","gambia":"Country","georgia":"Country","germany":"Country","ghana":"Country","greece":"Country","grenada":"Country",
"guatemala":"Country","guinea":"Country","guinea-bissau":"Country","guyana":"Country","haiti":"Country","honduras":"Country","hungary":"Country","iceland":"Country","india":"Country","indonesia":"Country","iran":"Country","iraq":"Country",
"ireland":"Country","israel":"Country","italy":"Country","ivory coast":"Country","jamaica":"Country","japan":"Country","jordan":"Country","kazakhstan":"Country","kenya":"Country","kiribati":"Country","korea north":"Country",
"korea south":"Country","kosovo":"Country","kuwait":"Country","kyrgyzstan":"Country","laos":"Country","latvia":"Country","lebanon":"Country","lesotho":"Country","liberia":"Country","libya":"Country","liechtenstein":"Country","lithuania":"Country",
"luxembourg":"Country","macedonia":"Country","madagascar":"Country","malawi":"Country","malaysia":"Country","maldives":"Country","mali":"Country","malta":"Country","marshall islands":"Country","mauritania":"Country","mauritius":"Country","mexico":"Country",
"micronesia":"Country","moldova":"Country","monaco":"Country","mongolia":"Country","montenegro":"Country","morocco":"Country","mozambique":"Country","myanmar, {burma}":"Country","namibia":"Country","nauru":"Country","nepal":"Country","netherlands":"Country",
"new zealand":"Country","nicaragua":"Country","niger":"Country","nigeria":"Country","norway":"Country","oman":"Country","pakistan":"Country","palestine":"Country","palau":"Country","panama":"Country","papua new guinea":"Country","paraguay":"Country",
"peru":"Country","philippines":"Country","poland":"Country","portugal":"Country","qatar":"Country","romania":"Country","russian federation":"Country","rwanda":"Country","st kitts & nevis":"Country","st lucia":"Country","saint vincent & the grenadines":"Country","samoa":"Country",
"san marino":"Country","sao tome & principe":"Country","saudi arabia":"Country","senegal":"Country","serbia":"Country","seychelles":"Country","sierra leone":"Country","singapore":"Country","slovakia":"Country","slovenia":"Country","solomon islands":"Country","somalia":"Country",
"south africa":"Country","south sudan":"Country","spain":"Country","sri lanka":"Country","sudan":"Country","suriname":"Country","swaziland":"Country","sweden":"Country","switzerland":"Country","syria":"Country","taiwan":"Country","tajikistan":"Country",
"tanzania":"Country","thailand":"Country","togo":"Country","tonga":"Country","trinidad & tobago":"Country","tunisia":"Country","turkey":"Country","turkmenistan":"Country","tuvalu":"Country","uganda":"Country","ukraine":"Country","united arab emirates":"Country",
"united kingdom":"Country","uruguay":"Country","uzbekistan":"Country","vanuatu":"Country","vatican city":"Country","venezuela":"Country","vietnam":"Country","yemen":"Country","zambia":"Country","zimbabwe":"Country",
"actively managed funds":"Business","actuary":"Business","administration":"Business","after-hours dealing":"Business","allocation rate":"Business","alternative investment market":"Business","annual bonus":"Business","annual equivalent rate (aer)":"Business","annual general meeting (agm)":"Business",
"annual percentage rate (apr)":"Business","annuity":"Business","arbitrage":"Business","asset stripping":"Business","auditors":"Business","average (arithmetic mean)":"Business","average earnings growth":"Business","balance of payments":"Business","balance sheet":"Business","banker's draft":"Business",
"base rate":"Business","bear market":"Business","bid-offer spread":"Business","black swan":"Business","blue chip":"Business","bridging loan":"Business","british retail consortium":"Business","buildings insurance":"Business","bull market":"Business","business cycle":"Business","buy-out":"Business","buy-to-let mortgage":"Business",
"cac 40 index":"Business","carry trade":"Business","cbi industrial trends":"Business","capital account":"Business","capital gain":"Business","capital gains tax":"Business","capital ratios - tier 1 and tier 2":"Business","cdos":"Business","central bank":"Business","chapter 11 bankruptcy":"Business","chartered institute of purchasing and supply":"Business",
"chartists":"Business","chinese walls":"Business","collateral":"Business","commercial paper":"Business","commodity":"Business","competition commission":"Business","confederation of british industry (cbi)":"Business","consumer prices index (cpi)":"Business","consumer confidence":"Business","contents insurance":"Business","corporate raiders":"Business","corporation tax":"Business",
"cost-push inflation":"Business","council tax":"Business","credit crunch":"Business","credit default swaps":"Business","credit reference agency":"Business","current account":"Business","day trading":"Business","dead cat bounce":"Business","defined benefit pension":"Business","defined contribution pension":"Business","deflation":"Business","demand-pull inflation":"Business",
"demutualisation":"Business","depression":"Business","derivatives":"Business","diminishing returns":"Business","discount mortgage":"Business","dividend":"Business","dividend yield":"Business","dow jones industrial average":"Business","ebit":"Business","ebitda":"Business","earnings per share (eps)":"Business","economic growth":"Business",
"economies of scale":"Business","elasticity":"Business","endowment policy":"Business","enterprise value":"Business","equity":"Business","equity derivatives":"Business","ethical investment":"Business","european bank for reconstruction and development":"Business","european central bank":"Business","externalities":"Business","final salary pension scheme":"Business","financial services authority":"Business",
"financial year":"Business","fiscal policy":"Business","fiscal year":"Business","fixed costs":"Business","fixed-rate mortgage":"Business","flexible mortgage":"Business","foreign exchange (forex)":"Business","freehold":"Business","ftse 100 index":"Business","ftse 250":"Business","ftse 350":"Business","ftse all-share":"Business",
"ftse smallcap":"Business","ftse techmark":"Business","ftse4good":"Business","futures":"Business","gazumping":"Business","gazundering":"Business","gearing":"Business","gilts":"Business","glass-steagall act":"Business","golden handcuffs":"Business","golden handshake":"Business","golden hello":"Business",
"golden parachute":"Business","golden rule":"Business","golden share":"Business","greenback":"Business","grey knight":"Business","gross domestic product (gdp)":"Business","gross national product (gnp)":"Business","ground rent":"Business","group of eight (g8)":"Business","group of seven (g7)":"Business","guaranteed annuity rate":"Business","guarantor":"Business",
"hang seng":"Business","hedge funds":"Business","home reversion plan":"Business","horizontal merger":"Business","hostile takeover":"Business","house price surveys":"Business","hyperinflation":"Business","income protection insurance":"Business","income statement":"Business","income tax":"Business","independent financial adviser (ifa)":"Business","individual savings account (isa)":"Business",
"industrial output":"Business","inflation":"Business","inflation measures":"Business","inheritance tax":"Business","insider trading":"Business","institutional investor":"Business","interest-only mortgage":"Business","interim":"Business","investment trust":"Business","invisible hand":"Business","irrational exuberance":"Business","joint account":"Business",
"keynesian economics":"Business","laissez-faire":"Business","leasehold":"Business","leveraged buyout":"Business","libor rate":"Business","liquid asset":"Business","lloyd's of london":"Business","loan-to-value":"Business","london stock exchange":"Business","macroeconomics":"Business","managed fund":"Business","manufacturing output":"Business",
"merger":"Business","microeconomics":"Business","minimum wage":"Business","monetarism":"Business","monetary policy committee":"Business","money supply":"Business","monopoly":"Business","mortgage broker":"Business","mortgage indemnity protection/guarantee":"Business","mortgage term":"Business","mutual fund":"Business","naked short-selling":"Business",
"nasdaq":"Business","national economic council":"Business","niesr":"Business","national debt":"Business","national insurance":"Business","negative equity":"Business","net asset value":"Business","new york stock exchange":"Business","nikkei 225":"Business","nominal interest rate":"Business","nominal values":"Business","non-executive director":"Business",
"occupational pension scheme":"Business","office for national statistics (ons)":"Business","office of fair trading (oft)":"Business","offshore account":"Business","old lady of threadneedle street":"Business","oligopoly":"Business","open-market operations":"Business","operating profit/loss":"Business","ordinary residence":"Business","ordinary share":"Business","organisation for economic cooperation and development":"Business",
"organisation of petroleum exporting countries (opec)":"Business","overdraft":"Business","pay as you earn (paye)":"Business","percentage change":"Business","permanent interest-bearing shares (pibs)":"Business","personal loan":"Business","poison pill":"Business","ponzi scheme":"Business","poverty trap":"Business","precipice bonds":"Business","preference shares":"Business","preliminary announcement (prelim)":"Business",
"premium bonds":"Business","price to earnings ratio (pe ratio)":"Business","primary discount rate":"Business","privatisation":"Business","producer price index":"Business","profit and loss account":"Business","profit participating deferred shares":"Business","public company":"Business","purchasing managers' index (pmi)":"Business","purchasing power parity":"Business","quantitative easing":"Business","quantity theory of money":"Business",
"quarterly report":"Business","random walk theory":"Business","rate of return":"Business","ratings agencies":"Business","real estate investment trusts":"Business","real interest rate":"Business","real values":"Business","recession":"Business","regressive tax":"Business","regulatory news service (rns)":"Business","repayment mortgage":"Business","retail prices index (rpi)":"Business",
"retirement age":"Business","reverse takeover":"Business","rights issue":"Business","royal mint":"Business","savings account":"Business","second-lien loan":"Business","securities and exchange commissionself-certification mortgage":"Business","self-invested personal pensions (sipps)":"Business","self-select isa":"Business","serious fraud office (sfo)":"Business","share index":"Business","share options":"Business",
"shareholder":"Business","short selling":"Business","sivs":"Business","smith, adam":"Business","soft commodities (softs)":"Business","special liquidity scheme":"Business","split capital investment trusts":"Business","spot market/spot price":"Business","square mile":"Business","stagflation":"Business","stakeholder pensions":"Business","stamp duty (equities)":"Business",
"stamp duty (housing)":"Business","standard & poor's 500 stock index":"Business","stock exchange":"Business","sub-prime loans":"Business","supply and demand":"Business","takeover":"Business","takeover panel":"Business","takeover bid":"Business","tangible common equity ratio":"Business","tarp (troubled asset relief programme)":"Business","tax haven":"Business","teaser rate":"Business",
"term assurance":"Business","terminal bonus":"Business","tracker funds":"Business","trade balance":"Business","underwriter (insurance)":"Business","underwriter (shares)":"Business","unemployment":"Business","unit trust":"Business","unquoted shares":"Business","value added tax (vat)":"Business","variable rate mortgage":"Business","vertical merger":"Business",
"vulture funds":"Business","weighted average":"Business","white knight":"Business","whole-of-life policy":"Business","windfall tax":"Business","without-profits policy":"Business","write off":"Business","yen carry trade":"Business","zero interest rates":"Business","zombie funds":"Business",
"donald trump":"Politics","justin trudeau":"Politics","benjamin ntanyahu":"Politics","ali khamenei":"Politics","king salman bin abdulaziz al saud":"Politics","dilma rousseff":"Politics","shinzao abe":"Politics","emmanuel macron":"Politics","theresa may":"Politics","pope francis":"Politics","narendra modi":"Politics","angela merkel":"Politics",
"vladimir putin":"Politics", "xi jinping":"Politics"
};

function show_post(post){
  var item = '';
  item += '<div class="post">';
  item += '<a href="' + post.url + '">\
            <span>' + post.title + '...</span>\
          </div>\
        </a>';
  item += '</div>';
  $('#popup').append(item);
  url = post.url;
  title = post.title;
}

function store_posts(newPosts, existingPosts){
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({'posts': newPosts});
  chrome.storage.local.set({'lastDate': new Date().toString()});
}

function use_existing_post(existingPosts){
  console.log("Retrieved previous posts: ", existingPosts.posts);

  show_post(existingPosts.posts[0]);
  existingPosts.posts.splice(0,1);
  store_posts([], existingPosts.posts);
}

function check_topics(doc){
  if (doc.match('#Country').found){
    return true;
  } else if (doc.match('#Politics').found){
    return true;
  } else if (doc.match('#Business').found){
    return true;
  }
  return false; //CHANGE!!
}

function filter_latest_posts(items, lastDate){
  var newPosts = [];
  var nlp = require('compromise');

  $.each(items, function (index, value){
    var item = value;
    var post = parse_post(item);
    var prevDate = new Date(lastDate.lastDate);
    if (post.date < prevDate) {
      return false;
    } else {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (check_topics(doc)){
        post.topics = doc.topics().out('array');
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0){
    var currentPost = newPosts[0];
    show_post(currentPost);
    newPosts.splice(0,1);
    console.log("putting these posts into storage: ", newPosts);
    chrome.storage.local.get('posts', function(existingPosts) {
      store_posts(newPosts, existingPosts);
    });
  } else {
    chrome.storage.local.get('posts', use_existing_post);
  }
}

//Randomly picks an article to display
function display_post(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  var items = $xml.find("item");

  chrome.storage.local.get('lastDate', function(date) {
    filter_latest_posts(items, date);
  });
}

//Calls background page to retrieve RSS feed
function fetch_feed() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {action : 'fetch_feed', url : 'http://www.rssmix.com/u/8269737/rss.xml'},
    function(response) {
      display_post(response);
    }
  );
}

$(document).ready(function() {
  //Button for bookmarking articles
  var bookmarkButton = document.querySelector('.bookmark');
  bookmarkButton.addEventListener('click', function() {
		chrome.bookmarks.create({'title': title,
                               'url': url});
    bookmarkButton.classList.add("disabled");
    bookmarkButton.innerHTML = "Bookmarked!";
  });

  //Getting articles from RSS feed
  fetch_feed();
});
