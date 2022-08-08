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
    const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if(time.match(timeReg)===null){
        return false;
    }
    else{
        return true;
    }
}

//verify datetime yyyy-mm-dd hh:mm:ss
function validDateTime(datetime) {
    var dateReg = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29))) (0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    if(datetime.match(dateReg)===null){
        return false;
    }
    else{
        return true;
    }
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
    pm.test(arrTimeZone[i].startAt+": startAt should be true format",function(){
        pm.expect(validateTime(arrTimeZone[i].startAt)).to.be.true;
    });

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
    var date1Updated = new Date(arrSpecificDate[i].startAt.replace(/-/g,'/'));  
    var date2Updated = new Date(arrSpecificDate[i].endAt.replace(/-/g,'/'));

    //test string startAt
    pm.test(arrSpecificDate[i].title+": startAt should be a string",function(){
    pm.expect(arrSpecificDate[i].startAt).to.be.a('string');
    });

    //test format startAt
    pm.test(arrSpecificDate[i].title+": startAt should be true format",function(){
        pm.expect(validDateTime(arrSpecificDate[i].startAt)).to.be.true;
    });

    //test string endAt
    pm.test(arrSpecificDate[i].title+": endAt should be a string",function(){
    pm.expect(arrSpecificDate[i].endAt).to.be.a('string');
    });

    //test format endAt
    pm.test(arrSpecificDate[i].title+": endAt should be true format",function(){
        pm.expect(validDateTime(arrSpecificDate[i].endAt)).to.be.true;
    });

    //compare 2 dates
    if(date1Updated>=date2Updated){
        pm.test(arrSpecificDate[i].title+": startAt should be less than endAt",function(){
            pm.expect(date1Updated).to.be.lessThan(date2Updated);
        });
    }else{
        pm.test(arrSpecificDate[i].title+": startAt should be less than endAt");
    }

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
    pm.test(arrBadge[i]+": should be a boolean",function(){
        pm.expect(typeof arrBadgeValue[i] === "boolean").to.be.true;
    });
}
