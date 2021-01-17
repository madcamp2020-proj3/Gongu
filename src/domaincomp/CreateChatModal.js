import React, { useState, useMemo } from 'react';
import "./modal.css";
import DatePicker from 'react-datepicker';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';

var NewChat = {
    id: "",
    title: "",
    subtitle: "",
    location: "",
    members: 1,
    personnel: 0,
    logo: "",
    category: [],
    startDate: "",
    endDate: ""
}

var Locat = {
    sido: "",
    gungu: "",
    dong: ""
}

const Modal = (props) => {

    var date = moment(new Date()).format('YYYY-MM-DD');

    var area0 = ["시/도 선택", "서울특별시", "인천광역시", "대전광역시", "광주광역시", "대구광역시", "울산광역시", "부산광역시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"];
    var area1 = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
    var area2 = ["계양구", "남구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"];
    var area3 = ["대덕구", "동구", "서구", "유성구", "중구"];
    var area4 = ["광산구", "남구", "동구", "북구", "서구"];
    var area5 = ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"];
    var area6 = ["남구", "동구", "북구", "중구", "울주군"];
    var area7 = ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"];
    var area8 = ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "여주군", "연천군"];
    var area9 = ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"];
    var area10 = ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군", "청원군"];
    var area11 = ["계룡시", "공주시", "논산시", "보령시", "서산시", "아산시", "천안시", "금산군", "당진군", "부여군", "서천군", "연기군", "예산군", "청양군", "태안군", "홍성군"];
    var area12 = ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"];
    var area13 = ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"];
    var area14 = ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"];
    var area15 = ["거제시", "김해시", "마산시", "밀양시", "사천시", "양산시", "진주시", "진해시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"];
    var area16 = ["서귀포시", "제주시", "남제주군", "북제주군"];

    var option0 = area0.map(area => { return { value: area, label: area } });
    var option1 = area1.map(area => { return { value: area, label: area } });
    var option2 = area2.map(area => { return { value: area, label: area } });
    var option3 = area3.map(area => { return { value: area, label: area } });
    var option4 = area4.map(area => { return { value: area, label: area } });
    var option5 = area5.map(area => { return { value: area, label: area } });
    var option6 = area6.map(area => { return { value: area, label: area } });
    var option7 = area7.map(area => { return { value: area, label: area } });
    var option8 = area8.map(area => { return { value: area, label: area } });
    var option9 = area9.map(area => { return { value: area, label: area } });
    var option10 = area10.map(area => { return { value: area, label: area } });
    var option11 = area11.map(area => { return { value: area, label: area } });
    var option12 = area12.map(area => { return { value: area, label: area } });
    var option13 = area13.map(area => { return { value: area, label: area } });
    var option14 = area14.map(area => { return { value: area, label: area } });
    var option15 = area15.map(area => { return { value: area, label: area } });
    var option16 = area16.map(area => { return { value: area, label: area } });

    const { open, close, header, func } = props;
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [members, setMembers] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState("")
    const [cSelected, setCSelected] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sido, setSido] = useState("");
    const [gungu, setGungu] = useState("");
    const [dong, setDong] = useState("");

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    }

    function clickhandler() {
        console.log("이게 된다.");
        NewChat.id = Date.now();
        NewChat.title = title;
        NewChat.subtitle = subtitle;
        NewChat.sido = sido;
        NewChat.personnel = members;
        NewChat.logo = image;
        NewChat.category = cSelected;
        NewChat.startDate = moment(startDate).format('YYYY-MM-DD');
        NewChat.endDate = moment(endDate).format('YYYY-MM-DD');
        console.log(Date.now());


        fetch("http://192.249.18.236:3001/makeroom", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NewChat)
        })
            .then(res => {
                console.log("방이 만들어졌습니다.");
                func();
            });
<<<<<<< HEAD
=======

>>>>>>> a508f0840ce71822b8aa754194438d8d4d71c99e
    }

    return (
        <div className={open ? 'openModal modal' : 'modal'} id="myModal">
            { open ? (
                <section>

                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>

                    <main>
                        <form>

                            <div class="form-group">
                                <label>제목:</label>
                                <input type="text" class="form-control" name="title" value={title} onChange={({ target: { value } }) => setTitle(value)}></input>

                            </div>

                            <div class="form-group">
                                <label>사진:</label>
                                <input type="file" name="image" value={image} onChange={({ target: { value } }) => setImage(value)}></input>
                            </div>

                            <div class="form-group">
                                <label>소제목:</label>
                                <input type="text" class="form-control" name="subtitle" value={subtitle} onChange={({ target: { value } }) => setSubtitle(value)}></input>
                            </div>

                            <div class="form-group">

                                <Row>
                                    <Col>
                                        <label>시작 날짜:</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            inline="true"
                                        />
                                    </Col>

                                    <Col>
                                        <label>마감 날짜:</label>
                                        <ReactDatePicker
                                            selected={endDate}
                                            onChange={date => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            inline="true"
                                            format="yyyy-mm-dd"

                                        /></Col>
                                </Row>
                            </div>

                            <div class="form-group">
                                <label>지역:</label>
                                <Row>
                                    <Col>
                                        <Select defaultValue={option0[0]} options={option0} name="sido" value={sido} onChange={({ target: { value } }) => setSido(value)} />
                                    </Col>

                                    <Col>
                                        <Select
                                        />
                                    </Col>

                                    <Col>
                                        <input type="text" class="form-control"></input>
                                    </Col>
                                </Row>
                                {/* <input type="text" class="form-control" name="location" value={location} onChange={({ target: { value } }) => setLocation(value)}></input> */}
                            </div>

                            <div class="form-group">
                                <label >최대 인원수:</label>
                                <input type="number" min="0" class="form-control" name="members" value={members} onChange={({ target: { value } }) => setMembers(value)}></input>
                            </div>

                            <label >카테고리 선택:</label>
                            <div class="form-group">
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("가공식품")} active={cSelected.includes("가공식품")}># 가공식품</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("농산물")} active={cSelected.includes("농산물")}># 농산물</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("과일")} active={cSelected.includes("과일")}># 과일</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("유아동")} active={cSelected.includes("유아동")}># 유아동</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("스포츠/레저")} active={cSelected.includes("스포츠/레저")}># 스포츠/레저</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("여성패션/잡화")} active={cSelected.includes("여성패션/잡화")}># 여성패션/잡화</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("남성패션/잡화")} active={cSelected.includes("남성패션/잡화")}># 남성패션/잡화</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("게임/취미")} active={cSelected.includes("게임/취미")}># 게임/취미</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("뷰티/미용")} active={cSelected.includes("뷰티/미용")}># 뷰티/미용</Button>
                                <Button className="m-1" variant="outline-primary" onClick={() => onCheckboxBtnClick("도서/티켓/음반")} active={cSelected.includes("도서/티켓/음반")}># 도서/티켓/음반</Button>
                            </div><div class="form-group">
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("상시모집")} active={cSelected.includes("상시모집")}># 상시모집</Button>
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("대량구매")} active={cSelected.includes("대량구매")}># 대량구매</Button>
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("자취")} active={cSelected.includes("자취")}># 자취</Button>
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("해외직구")} active={cSelected.includes("해외직구")}># 해외직구</Button>
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("나눔")} active={cSelected.includes("나눔")}># 나눔</Button>
                                <Button className="m-1" variant="outline-success" onClick={() => onCheckboxBtnClick("기타")} active={cSelected.includes("기타")}># 기타</Button>
                            </div>

                        </form>
                    </main>

                    <footer>
                        <button type="submit" className="btn btn-primary px-3"
                            onClick={clickhandler}>
                            Save </button>
                    </footer>

                </section>
            ) : null}
        </div>
    )
}


export default Modal;