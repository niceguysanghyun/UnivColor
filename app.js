var univNames = ["University of Tunis", "University of Tunis El Manar", "University of Manouba",
    "Adelphi", "CMU", "Harvard", "Singapore Management University", "Stanford",
    "UC Berkeley", "University of Rochester", "UT Rio Grande Valley",
    "University of Washington", "University of Waterloo",
    "William & Mary", "가야대", "가천대", "가톨릭대", "가톨릭관동대", "감리교신학대", "강남대",
    "강릉원주대", "강원대", "건국대", "건양대", "경기대", "경남과학기술대", "경남대", "경동대",
    "경북대", "경상대", "경성대", "경운대", "경일대", "경주대", "경희대", "계명대", "계명문화대", "고려대", "고신대",
    "공주대", "광신대", "광운대", "광주가톨릭대", "광주대", "광주여자대", "국민대", "군산대", "극동대",
    "금강대", "금오공대", "김천대", "꽃동네대", "나사렛대", "남부대", "남서울대", "단국대", "대구가톨릭대",
    "대구대", "대구예술대", "대구한의대", "대신대", "대전가톨릭대", "대전대", "대전신학대", "대진대", "덕성여대",
    "동국대", "동덕여대", "동명대", "동서대", "동신대", "동아대", "동양대", "동의대", "루터대", "명지대",
    "목원대", "목포가톨릭대", "목포대", "목포해양대", "배재대", "백석대", "부경대", "부산가톨릭대", "부산대",
    "부산외국어대", "부산장신대", "삼육대", "상명대", "서강대", "서경대", "서울대", "서울과학기술대",
    "서울시립대", "선문대", "성공회대", "성균관대","세명대", "세종대", "순천향대", "숭실대", "숭의여대", "아주대",
    "연세대", "영남대", "인천대", "인하대", "전남대", "전북대", "전주대", "중앙대", "충남대", "충북대", "카이스트",
    "평택대", "한국외국어대", "한국항공대", "한동대", "한밭대", "한성대", "한양대", "호서대", "홍익대"];

var UnivColor = {

    init : function () {
        this.univColorList = this.getUnivColorList();
        this.sortedByColor = this.sortedByColor(this.univColorList);
        
        this.rendering(this.sortedByColor);
        this.eventBindings();
    },

    getUnivColorList : function () {
        return univNames.map(function(name){
            var univObject = {};
            univObject.color = getColorByUnivName(name);
            univObject.name = name;
            return univObject;
        });
    },

    eventBindings : function () {
        $('#input').on('keyup', this.searchUnivColor);
        $('#input').autocomplete({ source: univNames });
        
        $('.colorBox').on('click', this.viewUnivColor.bind(this));
        $('.colorBox').on('hover', this.hoverEvent);
    },

    searchUnivColor : function (e) {
        var univName = (e.target.value).trim();
        var color = getColorByUnivName(univName);
        var $haxCode = $('#hexCode');
        if(color !== 'Not Found') {
            $haxCode.css({'background': color, 'color': '#ffffff'}).text(color);
        }

        return false;
    },

    viewUnivColor : function (e) {
        var self = e.currentTarget;
        var $haxCode = $('#hexCode');
        var color = this.rgbTohexCode($(self).css('background-color'));
        $haxCode.css({'background': color, 'color': '#ffffff', height: "32px"}).text(color);
    },

    rgbTohexCode : function (colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16).toUpperCase();
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        return color = '#' + parts.join('');
    },

    checkSafari : function () {
        if(navigator.userAgent.search("Safari") >= 0) return true;
        return false;
    },

    sortedByColor : function (univColorList) {
        return univColorList.sort(function(colorA, colorB) {
            return surfacecurve.color(colorA.color).hue() - surfacecurve.color(colorB.color).hue();
        });
    },

    rendering : function (sortedByColorList) {
        var $listWrapper = $('#university');

        var univListTemplate = sortedByColorList.map(function(univ) {
            var box = $('<div/>').addClass('colorBox').css({'background': univ.color}).text(univ.name);
            // If the browser is Safari, add class ".safari"
            if(this.checkSafari()) box.addClass('safari');
            return box.get(0);
        }.bind(this));

        $listWrapper.html(univListTemplate);
    }
}

$(function() {
    UnivColor.init(univNames);
});