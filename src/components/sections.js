import React from "react";
import Selector from "./Selector"

export function HeaderSection(props) {
    return (
          <div className="header-section">
              <h1 className="header-text" htmlFor="">Бронирование переговорной</h1>
          </div>
    );
  }

export function TowerSection(props) {
  return (
        <div className="tower-section">
            <Selector
                name="tower"
                blank="-"
                contentGenerator={() => {
                    const towers = []
                    for (let i = 0; i < props.towers.length; i++) {
                        towers.push({value: i + 1, title: props.towers[i]})    
                    }
                    return towers
                }}
            />
            <label htmlFor="tower-selector">Башня</label>
        </div>
  );
}

export function FloorSection(props) {
    return (
        <div className="floor-section">
            <Selector
                name="floor"
                blank="-"
                contentGenerator={() => {
                    const floors = [];
                    for (let floor = props.lowerFloor; floor <= props.upperFloor; floor++) {
                        floors.push({value: floor, title: floor});
                    }
                    return floors;
                }}
            />
            <label htmlFor="floor-selector">Этаж</label>
        </div>
    );
}

export function RoomSection(props) {
    return (
        <div className="room-section">
            <Selector
                name="room"
                blank="-"
                contentGenerator={() => {
                    const rooms = []
                    for (let room = 1; room <= props.roomsNumber; room++) {
                        rooms.push({value: room, title: room});
                    }
                    return rooms;
                }}
            />
            <label htmlFor="room-selector">Номер</label>
        </div>
    );
}

export function TimeSection(props) {
    const currentDate = () => {
        let dateObj = new Date();
        let currDay = dateObj.getDate();
        let currMonth = dateObj.getMonth() + 1;
        let currYear = dateObj.getFullYear();
        return `${
                    currYear
                }-${
                    String(currMonth).length > 1 ? currMonth : ('0' + currMonth)
                }-${
                    String(currDay).length > 1 ? currDay : ('0' + currDay)
                }`
    }
    return (
        <div className="date-n-time-section">
            <div className="date-section">
                <input 
                    onClick={() => {
                        const el = document.getElementById('date-selector');
                        if (el.classList.contains('invalid-field')) {
                            document.getElementById('date-selector').classList.remove('invalid-field');
                        }
                    }}
                    id="date-selector"
                    min={currentDate()} 
                    max="2099-12-31" 
                    type="date" 
                    name="date" 
                    required />
                <label htmlFor="date-selector">День</label>
            </div>
            <div className="time-section">
                <Selector 
                    name="time"
                    blank="чч:мм-чч:мм"
                    contentGenerator={() => {
                        const timeIntervals = [];
                        for (let hour = props.firstHour; hour <= props.lastHour; hour++) {
                            timeIntervals.push({
                                value: hour,
                                title: `${
                                    String(hour).length > 1  ? hour : '0' + hour
                                }:00 - ${
                                    String(hour + 1).length > 1 
                                        ? hour + 1 
                                        : '0' + (hour + 1)
                                }:00`
                            });
                        }
                        return timeIntervals
                    }}
                />
                <label htmlFor="time-selector">Время</label>
            </div>
        </div>
    );
}

export function CommentSection(props) {
    return (
        <div className="comment-section">
            <textarea name="comment" id="comment-area">

            </textarea>
            <label htmlFor="comment-area">Комментарий</label>
        </div>
    );
}

export function ButtonSection(props) {
    return (
        <div className="buttons-section">
            <button className="submit" onClick={props.onSubmit} type="submit">Отправить</button>
            <button className="clear" onClick={props.onClear} type="reset">Очистить</button>
        </div>
    );
}

export function SuccessMessage(props) {
    return (
        <div className={"success-container" + (props.isVisible ? '' : ' is-hidden')}>
            <HeaderSection />
            <div className="success-section">
                <div className="success-icon">
                    <svg 
                        className={props.isSuccess ? "" : "is-hidden"}
                        width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="64" cy="64" r="64" fill="#51C89D"/>
                        <path d="M25.1091 71.1163L47.7365 93.7437C48.9081 94.9153 50.8076 94.9153 51.9792 93.7437L102.891 42.832" stroke="white" strokeWidth="13" strokeLinecap="round"/>
                    </svg>
                    <div className={"loading" + (props.isSuccess ? " is-hidden" : " is-flexbox")}>
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                </div>
                <div className="success-message">
                    <span className="success-text">
                        {props.isSuccess ? "Переговорная успешно забронирована." : "Загрузка..."}
                    </span>
                    <a href={props.href} className={props.isSuccess ? "" : "is-invisible"}>
                        <button className="ready">Готово</button>
                    </a>
                </div>
            </div>
        </div>
    );
}