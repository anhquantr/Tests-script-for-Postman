//set data to all APIs
const jsonData = pm.response.json();
var accessToken = jsonData.schema.accessToken;
pm.globals.set('accessToken', accessToken);

//test successful POST request
pm.test("Successful POST request",function(){
    pm.expect(pm.response.code).to.be.eql(200);
});

//test string accessToken
pm.test("accessToken should be a string",function(){
    pm.expect(jsonData.schema.accessToken).to.be.a('string');
});

//verify time hh:mm
function validateTime(time){
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time.value);
    return isValid;
}

//verify datetime yyyy-mm-dd hh:mm:ss
function validDateTime(datetime) {
    var isValid = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) (0\d|1[01]):[0-5]\d:[0-5]\d$/;
    return isValid.test(datetime);
}

//test string timeZoneInfos
var timeZoneLength = jsonData.schema.globalParameters.timeZoneInfos.length;
var arrTimeZone = jsonData.schema.globalParameters.timeZoneInfos;
for(let i=0;i<timeZoneLength;i++){
    //test string startAt
    pm.test(arrTimeZone[i].startAt+": startAt should be a string",function(){
    pm.expect(arrTimeZone[i].startAt).to.be.a('string');
    });

    //test format startAt
    pm.test(arrTimeZone[i].startAt+": startAt should be true format",validateTime(arrTimeZone[i].startAt));

    //test string timeZoneName
    pm.test(arrTimeZone[i].startAt+": timeZoneName should be a string",function(){
    pm.expect(arrTimeZone[i].timeZoneName).to.be.a('string');
    });

    //test string title
    pm.test(arrTimeZone[i].startAt+": title should be a string",function(){
    pm.expect(arrTimeZone[i].title).to.be.a('string');
    });

    //test string subTitle
    pm.test(arrTimeZone[i].startAt+": subTitle should be a string",function(){
    pm.expect(arrTimeZone[i].subTitle).to.be.a('string');
    });
}

//test string specificDateTimes
var specificDateLength = jsonData.schema.globalParameters.specificDateTimes.length;
var arrSpecificDate = jsonData.schema.globalParameters.specificDateTimes;
for(let i=0;i<specificDateLength;i++){
    //test string startAt
    pm.test(arrSpecificDate[i].title+": startAt should be a string",function(){
    pm.expect(arrSpecificDate[i].startAt).to.be.a('string');
    });

    //test format startAt
    pm.test(arrSpecificDate[i].title+": startAt should be true format",validDateTime(arrSpecificDate[i].startAt));

    //test string endAt
    pm.test(arrSpecificDate[i].title+": endAt should be a string",function(){
    pm.expect(arrSpecificDate[i].endAt).to.be.a('string');
    });

    //test format endAt
    pm.test(arrSpecificDate[i].title+": endAt should be true format",validDateTime(arrSpecificDate[i].endAt));

    //test string title
    pm.test(arrSpecificDate[i].title+": title should be a string",function(){
    pm.expect(arrSpecificDate[i].title).to.be.a('string');
    });
    
    //test string subTitle
    pm.test(arrSpecificDate[i].title+": subTitle should be a string",function(){
    pm.expect(arrSpecificDate[i].subTitle).to.be.a('string');
    });
}

//test number point
pm.test("point should be a number",function(){
    pm.expect(jsonData.schema.globalParameters.point).to.be.a('number');
});

//test bool badge
var badgeLength = Object.keys(jsonData.schema.globalParameters.badge).length;
var arrBadge = Object.keys(jsonData.schema.globalParameters.badge);
var arrBadgeValue = Object.values(jsonData.schema.globalParameters.badge);

for(let i=0;i<badgeLength;i++){
    if(arrBadgeValue[i]===true){
        pm.test(arrBadge[i]+": should be a boolean",function(){
            pm.expect(arrBadgeValue[i]).to.be.true;
        });
    }
    else if(arrBadgeValue[i]===false){
        pm.test(arrBadge[i]+": should be a boolean",function(){
            pm.expect(arrBadgeValue[i]).to.be.false;
        });
    }
}