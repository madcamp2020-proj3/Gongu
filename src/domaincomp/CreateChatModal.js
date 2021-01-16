import React, { useState } from 'react';
import "./modal.css";
import DatePicker from 'react-datepicker';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-bootstrap-select';

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


const Modal = (props) => {
    var date = moment(new Date()).format('YYYY-MM-DD');
    

    const { open, close, header } = props;
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [location, setLocation] = useState("");
    const [members, setMembers] = useState("");
    const [image, setImage] = useState(null);
    const [cSelected, setCSelected] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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
        NewChat.location = location;
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
            });

        
        close();
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
                                        
                                    </Col>
                                    <Col>
                                        
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