(function(){
'use strict';

// 증액적금모듈 increaseSavings(적용할 element id, 적금기간, 적금설정금액);
// increaseSavings('w26p5', 26, 5000);
increaseSavings('w26p10', 26, 10000);

})();

function increaseSavings(id, period, price){
	var sum = stack = stackSum = weekNum = 0,
		templete, totalPrice,
		sumArr = new Array(),
		stackArr = new Array(),
		startDate = new Date(document.getElementById(id).getAttribute('data-sDate')),
		sYear = startDate.getFullYear(), // 시작일의 년도
		sMonth = startDate.getMonth() + 1, // 시작일의 월
		sDate = startDate.getDate(), // 시작일의 일
		sDay = startDate.getDay(), // 시작일의 요일
		week = new Array('일', '월', '화', '수', '목', '금', '토'),
		mFirstDate = new Date(sYear, sMonth, 1),
		mLastDate = new Date(sYear, sMonth, 0).getDate(),
		firstDayOfWeek = (mFirstDate.getDay() === 0) ? 7 : mFirstDate.getDay(),
		lastDayOfWeek = new Date(sYear, sMonth, 0).getDay(),
		lastWeekNum = Math.ceil((firstDayOfWeek - 1 + mLastDate) / 7);

	for(var i=0;i<=period;i++){
		stack = price * i; // 매 주 입금할 금액 산출(증액)
		sum += stack; // 매 주 누적 금액 산출

		weekNum = i;
		sDate += 7;

		if( sDate >= mLastDate ){
			sMonth += 1;

			if( sMonth > 12 ){
				sMonth = 1;
			}

			mFirstDate = new Date(sYear, sMonth, 1);
			mLastDate = new Date(sYear, sMonth, 0).getDate();
			firstDayOfWeek = (mFirstDate.getDay() === 0) ? 7 : mFirstDate.getDay();
			lastDayOfWeek = new Date(sYear, sMonth, 0).getDay();
			lastWeekNum = Math.ceil((firstDayOfWeek - 1 + mLastDate) / 7);
		}

		stackArr.push(stack); // 매 주 입금할 금액 배열
		sumArr.push(sum); // 매 주 누적 금액 배열

		if( i > 0 ){
			templete = '<tr><th>' + i + ' 주차</th><td>' + numberFormat(stackArr[i]) + ' 원</td><td>' + numberFormat(sumArr[i]) + ' 원</td></tr>';

			// 적금 기간 동안 입금할 금액, 누적 금액
			document.getElementById(id).getElementsByClassName('stack-table_list')[0].innerHTML += templete;

			if( i%4 === 0 ){
				stackSum = sumArr[i] - sumArr[i-4];

				templete = '<tr><th class="month">' + (i/4) + ' 개월차 입금 액</th><td colspan="2" class="month">' + numberFormat(stackSum) + ' 원</td></tr>';

				// 적금 기간 동안 매달 입금할 총 금액
				document.getElementById(id).getElementsByClassName('stack-table_list')[0].innerHTML += templete;
			}
		}
	}

	totalPrice = numberFormat(sum) + ' 원';
	// 만기시 예상금액
	document.getElementById(id).getElementsByClassName('stack-total_price')[0].innerHTML = totalPrice;
}

function numberFormat(num){
	var reg = /\B(?=(\d{3})+(?!\d))/g;

	return num.toString().replace(reg, ',');
	// return new Intl.NumberFormat().format(num);
}

/*function get_Date(obj) { //월요일 ~ 일요일 구하기
    var year = obj.substring(0, 4);
    var month = obj.substring(4, 6);
    var day = obj.substring(6, 8);
    var week = new Array("일", "월", "화", "수", "목", "금", "토");

    var vn_day1 = new Date(year, month - 1, day);

    var i = vn_day1.getDay(); //기준일의 요일을 구한다.( 0:일요일, 1:월요일, 2:화요일, 3:수요일, 4:목요일, 5:금요일, 6:토요일 )

    if ((i > 0) && (i < 7)) { //기준일이 월~토 일때
        intDayCnt1 = 1 - i;
        intDayCnt2 = 7 - i;
    }
    else if (i == 0) {  //기준일이 일요일일때
        intDayCnt1 = -6;
        intDayCnt2 = 0;
    }

    //기준일의 주의 월요일의 날짜와 토요일의 날짜
    var Cal_st = new Date(vn_day1.getYear(), vn_day1.getMonth(), vn_day1.getDate() + intDayCnt1);
    var Cal_en = new Date(vn_day1.getYear(), vn_day1.getMonth(), vn_day1.getDate() + intDayCnt2);

    //날짜표시형식 첫번째 (예: 2008년 5월 1일)
    // var st_day = Cal_st.getYear()+"년 "+(Cal_st.getMonth()+1)+"월 "+Cal_st.getDate()+"일 "+ week[Cal_st.getDay()]+"요일";
    // var en_day = Cal_en.getYear()+"년 "+(Cal_en.getMonth()+1)+"월 "+Cal_en.getDate()+"일 "+ week[Cal_en.getDay()]+"요일";

    //날짜표시형식 두번째 (예: 20080501)
    var st_day2 = DateFormat(Cal_st);
    var en_day2 = DateFormat(Cal_en);

    //br = '<BR>';
    //document.writｅ ("기준일 : " + obj + br);
    //document.writｅ ("시작일(월) : " + st_day + " (" + st_day2 + ")" + br);
    //document.writｅ ("종료일(일) : " + en_day + " (" + en_day2 + ")" + br);
    document.frmDate.txtSDate.value = st_day2;
    document.frmDate.txtEDate.value = en_day2;

}

function DateFormat(obj) { //날짜를 YYYYMMDD 형식으로 변경하는 함수
    //Year
    var yy = obj.getYear();
    //Month
    if (String(obj.getMonth() + 1).length == 1) {
        var mm = "0" + (obj.getMonth() + 1);
    }
    else {
        var mm = obj.getMonth() + 1;
    }
    //Day
    if (String(obj.getDate()).length == 1) {
        var dd = "0" + obj.getDate();
    }
    else {
        var dd = obj.getDate();
    }
    var date = String(yy) + "-" + String(mm) + "-" + String(dd);
    return date;
}*/