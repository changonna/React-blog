/* eslint-disable */        //--> terminal의 warning 메시지 지우기.

import './App.css';
import {useState} from "react";

function App() {

    let post = '강남 우동 맛집';
    // useState(보관할 자료) : 자료를 보관할 수 있는 state
    // let[a, b] -> a : 데이터 , b : state 변경도와주는 함수
    // state는 var와 달리 자동 재렌더링 됨.;
    let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
    let date = ['2월 17일 발행', '2월 18일 발행', '2월 19일 발행', '2월 20일 발행', '2월 21일 발행'];
    let [따봉, 따봉변경] = useState([0, 0, 0, 0, 0]);

    let [modal, setModal] = useState(false);

    let [titleNum, setTitleNum] = useState(0);

    let [입력값, 입력값변경] = useState('');

    /* map 함수
    * 1. array 자료 갯수만큼 함수안의 코드 실행해줌
    * 2. 함수의 파라미터는 array안에 있던 자료
    * 3. return에 값 적으면 array로 담아줌 */
    [1,2,3].map(function(a){
        // console.log(a);
        return '1233211'
    });

    return (
        <div className="App">
            {/* 1. class 대신 classNmae 사용 */}
            <div className="black-nav">
                {/* 2. style 넣을 땐 style={{이름:'값'}} */}
                <h4 style={{color:'white', fontSize:'16px'}}>ReactBlog</h4>
            </div>
            
            <button onClick={() => {
                let copy = [...title];
                copy.sort();
                setTitle(copy);
            }}>가나다순정렬</button>
            
            <button onClick={() => {
                // [...] : 괄호를 벗기고 다시 씌워서 완전히 독립적인 array 사본이 생성된다.
                let copy = [...title];  // --> ... : 괄호를 벗겨주세요 // [] : 괄호를 다시 씌운다.
                copy[0] = '여자코트 추천';
                setTitle(copy);
            }}>글수정</button>
            
            {/*<div className="list">*/}
            {/*    /!* 3. {변수명} *!/*/}
            {/*    <h4>{title[0]} <span onClick={ ()=>{ 따봉변경(따봉+1) } }>👍</span> {따봉} </h4>*/}
            {/*    <p>{date}</p>*/}
            {/*</div>*/}
            {/*<div className="list">*/}
            {/*    <h4>{title[0]}</h4>*/}
            {/*    <p>{date}</p>*/}
            {/*</div>*/}
            {/*<div className="list">*/}
            {/*    <h4 onClick={()=>{ setModal(!modal) }}>{title[1]}</h4>*/}
            {/*    <p>{date}</p>*/}
            {/*</div>*/}


            {
                /* 중괄호 안에는 for문을 쓸 수 없어서 map 함수를 사용한다. */
                // [1, 2, 3].map(function() {
                title.map(function(a, i) {
                    return (
                        // React는 Array안에 html 담아놔도 잘 보여준다.
                        // 각 div마다 unique한 key 값을 정해줘야한다.
                        <div className="list" key={i}>
                            <h4 onClick={()=>{ setModal(true); setTitleNum(i); }}> { title[i] }
                                <span onClick={(e) => {
                                    e.stopPropagation();    // 상위 html로 퍼지는 이벤트 버블링을 막고싶으면!
                                    let copy = [...따봉];
                                    copy[i] += 1;
                                    따봉변경(copy);
                                }}>👍</span> { 따봉[i] }
                            </h4>
                            <p>{ date[i] }</p>
                            <button onClick={(e) => {
                                let copy = [...title];
                                copy.splice(i, 1);  // arr.splice : i번째부터 1개만큼 삭제.
                                setTitle(copy);
                            }}> 글 삭제 </button>
                        </div>
                    )
                })
            }

            {/*이벤트 핸들러*/}
            <input onChange={(e) => {
                입력값변경(e.target.value);  // 이게 완료되기 전에
                console.log(입력값);        //
            }} />
            <button onClick={(e) => {
                let copy = [...title];
                copy.push(입력값);
                setTitle(copy);
            }}> 글 등록 </button>

            <div>
                <h1>{modal}</h1>
            </div>

            {/* javascript 쓰려면 중괄호{}를 열어준다. */}
            {
                /* 부모 -> 자식 state 전송하는법 (자식에서 부모로는 불가능)
                * 1. <자식컴포넌트 작명={state이름}
                * 2. 함수에 props 파라미터 등록 후 props.작명 사용 */
                modal == true ? <Modal color={'yellow'} title={title} setTitle={setTitle} titleNum={titleNum}/> : null
            }

        </div>
    );
}

/* 컴포넌트로 만들면 좋은 것
* 1. 반복적인 html 축약
* 2. 큰 페이지
* 3. 자주변경되는 것 */

/* 컴포넌트 만드는 법
    1. function 만들기 [ App() 밖으로 뺴서 사용 ]
    2. return()안에 html 담기
    3. <함수명></함수명> 쓰기 */

// function Modal() {           // function으로 사용.
const Modal = (props) => {           // 변수 const를 사용해서 나중에 변경시 에러뜨게.
    return (
        // 가장 바깥 태그는 한 개만 가능하다.
        // 여러개 일때는 <></>로 묶어서 사용하자.
        <>
            <div className="modal" style={{background : props.color}}>
                <h4>{props.title[props.titleNum]}</h4>
                <p>날짜</p>
                <p>상세내용</p>
                <button onClick={() => {                {/* 버튼 클릭시 첫 글 제목이 '여자코트 추천'으로 바뀌는 기능 */}
                    let copyTitle = [...props.title];   // setTitle 함수를 props로 넘겨서 사용.
                    copyTitle[0] = '여자코트 추천';
                    props.setTitle(copyTitle);
                }}>글수정</button>
            </div>
        </>
    );
}

// props를 응용한 상세페이지 만들기.


export default App;
