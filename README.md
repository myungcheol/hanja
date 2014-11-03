hanja
=====

JSON 형태로 저장된 소규모 한자 사전 파일. 한자로 된 문서를 한글로 변환하는 용도로 사용이 가능하다. 

##원본
사전의 [원본](http://happycgi.com/13322)파일은 한자 독음을 기준으로 한자가 정렬되어 있다. 예를 들자면 독음이 `가`인 한자들이 먼저 나열되어 있고, 그 다음은 독음이 `간`인 한자들이 나열되어 있다. 두음법칙을 적용하기도 하여 일부 한 자는 `ㄹ`에서 한 번 `ㅇ`에서 또 한 번 나온다. 

###원본 파일의 오류
- 두음 법칙이 적용가능한 모든 한자에 대해 두 번씩 나열된 것이 아니므로, 일부 한자는 `ㄹ` 또는 `ㅇ` 중 한 쪽에만 나올 수 있다.
- 일부 한자는 잘못된 독음 밑에 분류가 되어있기도 하다.
- 옛 한자의 경우 현재 사용되는 한자의 옛 한자라고만 나오고 뜻은 나오지 않는다.
- 간체 한자의 경우도 옛 한자와 마찬가지 오류가 있다.
- 수정된 원본 파일은 [hanja.txt](https://github.com/myungcheol/hanja/blob/master/hanja.txt)에서 볼 수 있다.

##JSON 파일 사용
- [hanja.txt](https://github.com/myungcheol/hanja/blob/master/hanja.txt)을 읽어서 [makeJSON](https://github.com/myungcheol/hanja/blob/master/makeJSON.js)으로 `hanjaDic`을 만든다.
- 총 9,031개의 한자가 등록되어 있다.
- 원본 파일의 오류를 일부 수정했다.
- 완벽한 한자 변환 서비스가 아닌 초벌 번역 수준의 서비스가 필요할 경우만 사용을 권장한다.
- 한자 변환 오류는 책임지지 않는다.
- hanjaDic.js 파일을 불러오면 `hanjaDic`이라는 json 오브젝트에 다음과 같이 정의되어 있다.

```Javascript
var hanjaDic = {
  '伽': [{
    kor: '가'
    def: '절'
  }],
  '한자': [{
    kor: '음1',
    def: '뜻2'
  }, {
    kor: '음2',
    def: '뜻2'
  }],
  ...
};
```

`hanjaDic['한자']`은 둘 중의 하나 `undefined` 또는 음과 뜻으로 구성된 배열로 반환한다. 

```Javascript
var chi = '丑';
console.log(hanjaDic[chi]);
// [Object, Object]
// hanjaDic[chi][0] = {def: '수갑', kor: '추'}
// hanjaDic[chi][1] = {def: '소', kor: '축'}

chi = '';
console.log(hanjaDic[chi]);
// undefined


