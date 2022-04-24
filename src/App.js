/* eslint-disable */        //--> terminal의 warning 메시지 지우기.

import './App.css';
import {useState} from "react";

function App() {

    let post = '강남 우동 맛집';
    // useState(보관할 자료) : 자료를 보관할 수 있는 state
    // let[a, b] -> a : 데이터 , b : state 변경도와주는 함수
    // state는 var와 달리 자동 재렌더링 됨.;
    let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
    let date = '2월 17일 발행';

    let [따봉, 따봉변경] = useState(0);

    return (
        <div className="App">
            {/* 1. class 대신 classNmae 사용 */}
            <div className="black-nav">
                {/* 2. style 넣을 땐 style={{이름:'값'}} */}
                <h4 style={{color:'white', fontSize:'16px'}}>ReactBlog</h4>
            </div>
            
            <button onClick={() => {
                let copy = [...title];
                copy = copy.sort();
                setTitle(copy);
            }}>가나다순정렬</button>
            
            <button onClick={() => {
                // [...] : 괄호를 벗기고 다시 씌워서 완전히 독립적인 array 사본이 생성된다.
                let copy = [...title];  // --> ... : 괄호를 벗겨주세요 // [] : 괄호를 다시 씌운다.
                copy[0] = '여자코트 추천';
                setTitle(copy);
            }}>글수정</button>
            
            <div className="list">
                {/* 3. {변수명} */}
                <h4>{title[0]} <span onClick={ ()=>{ 따봉변경(따봉+1) } }>👍</span> {따봉} </h4>
                <p>{date}</p>
            </div>
            <div className="list">
                <h4>{title[1]}</h4>
                <p>{date}</p>
            </div>
            <div className="list">
                <h4>{title[2]}</h4>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default App;
