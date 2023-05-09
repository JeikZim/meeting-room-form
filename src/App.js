import "./App.css";
import React from "react";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { isMusicPlaying: false }
    // };

    // handleClick(event) {
    //     if (this.state.isMusicPlaying) {
    //         this.audio.pause();
    //     } else {
    //         this.audio.play();
    //     }
    //     this.setState((prevState) => {
    //         return { isMusicPlaying: !prevState.isMusicPlaying }
    //     });
    // };

    // render() {
    //   return (
    //       <div>
    //           <PlayButton 
    //               isMusicPlaying={this.state.isMusicPlaying} //Передаём props по значению state 
    //               onClick={this.handleClick.bind(this)} //Прикреплем обработчик
    //           />    
    //           <audio id="audio" ref={(audioTag) => { this.audio = audioTag }} />
    //       </div>
    //   );
    // };

    onSubmit(ev) {
        ev.preventDefault();

        const form = document.getElementById('main-form');
        const formDataObj = new FormData(form);
        const formData = {
            tower: formDataObj.get('tower'),
            floor: formDataObj.get('floor'),
            room: formDataObj.get('room'),
            date: formDataObj.get('date'),
            time: formDataObj.get('time'),
            comment: formDataObj.get('comment'),
        }

        if (!formData.tower) {
            console.log('tower')
            return;
        } 
        if (!formData.floor) {
            console.log('floor')
            return;
        } 
        if (formData.room) {
            try {
                // Запрашивает на сервере свободна ли всё ещё переговорка
                // Если нет, то сообщает об этом и обновляет состояние 

            } 
            catch (err) {
                console.error(err)
                return;
            }
        } 
        else {
            console.log('room')
            return;
        } 
        if (formData.date && formData.time) {
            const arr = formData.date.split('-');
            const 
                year = arr[0],
                month = arr[1],
                day = arr[2]
                // Дата и время бронирования в миллисекундах
            const meetingDate = Date.UTC(year, month, day) + formData.time * 60 * 60 * 1000;

            // Проверка: до дня бронирования должно быть НЕ БОЛЬШЕ 30 дней (в миллисекунлах)
            if (Date.now() - meetingDate <= 2592000000) {

            } else {
                // TODO: Заменить
                alert("Нельзя бронировать переговорную раньше чем за месяц.")
            }
        } 
        else {
            console.log('date || time')
            return;
        }

        // Придумать валидацию комментариев 
    

        // ПРОВЕСТИ ВАЛИДАЦИЮ
        // ОТОБРАЗИТЬ АНИМАЦИЮ УСПЕШНОГО ОТПРАВЛЕНИЯ

        console.log(formData)

        // comment
        // "AAAAA НАДО СРОЧНО"

        // date
        // "2023-05-11"

        // time
        // "11"


        // if (this.state.isMusicPlaying) {
        //     this.audio.pause();
        // } else {
        //     this.audio.play();
        // }
        // this.setState((prevState) => {
        //     return { isMusicPlaying: !prevState.isMusicPlaying }
        // });
    };

    onClear(ev) {
        const towerSelector = document.querySelector('#tower-selector option');
        const floorSelector = document.querySelector('#floor-selector option');
        const roomSelector = document.querySelector('#room-selector option');
        const timeSelector = document.querySelector('#time-selector option');
        
        towerSelector.value = ""
        floorSelector.value = ""
        roomSelector.value = ""
        timeSelector.value = ""

        towerSelector.innerHTML = "-"
        floorSelector.innerHTML = "-"
        roomSelector.innerHTML = "-"
        timeSelector.innerHTML = "чч:мм-чч:мм"
    }

    render() {
        return (
            <div className="App">
                <form id="main-form" className="form">
                    <HeaderSection />
                    <div className="place-section">
                        <TowerSection towers={['А', 'Б']} />
                        <FloorSection lowerFloor={3} upperFloor={27} />
                        <RoomSection roomsNumber={10} />
                    </div>
                    <TimeSection firstHour={8} lastHour={20} />
                    <CommentSection />
                    <ButtonSection 
                        onSubmit={this.onSubmit.bind(this)}
                        onClear={this.onClear.bind(this)}
                    />
                </form>
            </div>
        );
    }
}
class Selector extends React.Component {
    constructor(props) {
        super(props);
    
        this.contentGenerator = props.contentGenerator;
        this.name = props.name
        this.blank = props.blank

        this.state = {
            isOpen: false,
            wasOpened: false,
            option: {
                value: null,
                title: this.blank
            } 
        }
    }

    openSelect(ev) {
        ev.preventDefault()

        if (!this.state.wasOpened) {
            document.addEventListener('click', this.closeSelect.bind(this))
        }

        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen,
                wasOpened: true
            }
        });
    }

    closeSelect(ev) {
        const selectorsGroup = document.getElementById(this.name + "-selectors-group")
        const withinBoundaries = ev.composedPath().includes(selectorsGroup);
    
        if ( !withinBoundaries ) {
            this.setState(() => {
                return { isOpen: false }
            });
        }
    }

    selectOption(obj) {
        return (ev) => {
            ev.preventDefault()

            this.setState((prevState) => {
                return { 
                    option: obj,
                    isOpen: !prevState.isOpen 
                }
            })
        }
    }

    render() {
        return (
            <div 
                id={this.name + "-selectors-group"} 
                className={"selectors-group " + (this.state.isOpen ? "open" : "")}
            >
                <div className={"pseudo-select " + (this.state.isOpen ? "open" : "")}>
                    {this.contentGenerator().map(obj => (
                        <div 
                            key={obj.value}
                            onClick={this.selectOption(obj).bind(this)} 
                            className="pseudo-option" 
                            value={obj.value}
                        >
                            {obj.title}
                        </div>
                    ))}
                </div>
                <select 
                    className={"select " + (this.state.isOpen ? "open" : "")}
                    onMouseDown={this.openSelect.bind(this)}
                    // onBlur={this.openSelect.bind(this)}
                    id={this.name + "-selector"} 
                    name={this.name} 
                    required
                >
                    <option 
                        value={this.state.option.value ? this.state.option.value : null} 
                        
                    >
                        {this.state.option.title ? this.state.option.title : this.blank}
                    </option>
                </select>
            </div>
        );
    }
}

function HeaderSection(props) {
    return (
          <div className="header-section">
              <h1 className="header-text" htmlFor="">Бронирование переговорной</h1>
          </div>
    );
  }

function TowerSection(props) {
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

function FloorSection(props) {
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

function RoomSection(props) {
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

function TimeSection(props) {
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

function CommentSection(props) {
    return (
        <div className="comment-section">
            <textarea name="comment" id="comment-area">

            </textarea>
            <label htmlFor="comment-area">Комментарий</label>
        </div>
    );
}

function ButtonSection(props) {
    return (
        <div className="buttons-section">
            <button className="submit" onClick={props.onSubmit} type="submit">Отправить</button>
            <button className="clear" onClick={props.onClear} type="reset">Очистить</button>
        </div>
    );
}


export default App;
