import React, { useState } from 'react';
import "./modal.css";
import { Button, ButtonGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { stringify } from 'uuid';

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
    const { open, close, header } = props;
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [location, setLocation] = useState("");
    const [members, setMembers] = useState("");
    const [image, setImage] = useState(null);
    const [cSelected, setCSelected] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
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
                                        <DatePicker
                                            selected={endDate}
                                            onChange={date => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            inline="true"
                                        /></Col>
                                </Row>
                            </div>

                            <div class="form-group">
                                <label>지역:</label>
                                <input type="text" class="form-control" name="location" value={location} onChange={({ target: { value } }) => setLocation(value)}></input>
                            </div>

                            <div class="form-group">
                                <label >최대 인원수:</label>
                                <input type="number" class="form-control" name="members" value={members} onChange={({ target: { value } }) => setMembers(value)}></input>
                            </div>

                            <div class="form-group">
                                <label >카테고리 선택:</label>
                                <ButtonGroup class="modal-dialog">
                                    <Button color="primary" onClick={() => onCheckboxBtnClick(1)} active={cSelected.includes(1)}>One</Button>
                                    <Button color="primary" onClick={() => onCheckboxBtnClick(2)} active={cSelected.includes(2)}>Two</Button>
                                    <Button color="primary" onClick={() => onCheckboxBtnClick(3)} active={cSelected.includes(3)}>Three</Button>
                                </ButtonGroup>
                            </div>

                        </form>
                    </main>

                    <footer>
                        <button type="submit" className="btn btn-primary px-3"
                            // onClick={() => localStorage.setItem(title, [subtitle, location, members, startDate, endDate, cSelected])}> Save </button>
                            onClick={() => 
                            NewChat.id = Date.now(), 
                            NewChat.title = title,
                            NewChat.subtitle = subtitle,
                            NewChat.location = location,
                            NewChat.personnel = members,
                            NewChat.logo = image,
                            NewChat.category = cSelected,
                            NewChat.startDate = startDate,
                            NewChat.endDate = endDate,
                            localStorage.setItem("newchat", [NewChat.id, NewChat.title, NewChat.endDate]),
                            console.log(Date.now())
                        
                           }> 
                            Save </button>
                    </footer>

                </section>
            ) : null}
        </div>
    )
}


export default Modal;