// hanja.txt 파일 읽기
function getData() {       

	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4) {

			var lines = xmlhttp.responseText;

			// 다 읽은 후 json으로 변환
			makeJSON(lines);  
		}
	};

	xmlhttp.open("GET", "/hanja.txt", true);
	xmlhttp.send();
}

function makeHanjaDic(lines) {
	var lineArr = lines.split('\n'); 

	/* 
	 * hanja.txt 파일 형식
	 * 
	 * [가]
	 * 伽=절 가, xxxx (획수)
	 * 佳=아름다울 가,
	 * ...
	 * [간]
	 * ...
	 * ...
 	 */
	var kor = '';
	var hanjaDic = {};
	
	lineArr.forEach(function(line) {
		if (line.charAt(line.length -1) != ']') {
			// [가]
			// 한자 음 발췌
			kor = line.replace(']', '').replace('[', '');			
		} else {
			// 伽=절 가, xxx (획수)
			// 한자 뜻 발췌
			// 마지막에 있는 한자 음은 제외

			var defIndex = line.indexOf(',');

			if (defIndex < 0) {
				defIndex = line.indexOf('(') - 3;
			} else {
				defIndex += -3;
			}

			var chi = line.charAt(0);
			var item = {
				kor: kor,
				def: line.substr(2, defIndex).trim()
			};

			if (hanjaDic[chi] != undefined) {
				hanjaDic[chi].push(item);
			}  else {
				hanjaDic[chi] = [item];
			}
		}
	});

	console.log(JSON.stringify(hanjaDic));
}
