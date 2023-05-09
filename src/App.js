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

    onSubmit(event) {
        event.preventDefault();

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
            catch (error) {
                console.error(error)
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

    render() {
        return (
            <div className="App">
                <form id="main-form" className="form" method="" action="">
                    <HeaderSection />
                    <div className="place-section">
                        <TowerSection />
                        <FloorSection lowerFloor={3} upperFloor={27} />
                        <RoomSection roomsNumber={10} />
                    </div>
                    <TimeSection firstHour={8} lastHour={20} />
                    <CommentSection />
                    <ButtonSection onSubmit={this.onSubmit.bind(this)}/>
                </form>
            </div>
        );
    }
}

function HeaderSection(props) {
    return (
          <div className="header-section">
              <h1 className="header-text" for="">Бронирование переговорной</h1>
          </div>
    );
  }

function TowerSection(props) {
  return (
        <div className="tower-section">
            <select required name="tower" id="tower-selector">
                <option value="" selected disabled>-</option>
                <option value="А">А</option>
                <option value="Б">Б</option>
            </select>
            <label for="tower-selector">Башня</label>
        </div>
    //   <a 
    //       onClick={props.onClick} // Прикрепление функции из переданных свойств (props)
    //       className={ // dynamic className with state(props?) dependency
    //           props.isMusicPlaying ? 'play active' : 'play'
    //       }
    //       href="#" title="Play music"  
    //   />
  );
}

function FloorSection(props) {
    
    const lowerFloor = props.lowerFloor;
    const upperFloor = props.upperFloor;
    const nums = [];

    for (let num = lowerFloor; num <= upperFloor; num++) {
        nums.push( num );
    }
    
    return (
        <div className="floor-section">
            <select 
                // size={1} 
                // onClick={this.size= (this.size!=1) ? nums.length : 5} 
                // onMouseLeave={this.size= (this.size!=1) ? nums.length : 5} 
                name="floor" id="floor-selector" required
            >
                <option value="" selected disabled>-</option>
                { nums.map(num => (
                        <option value={num}>{num}</option>
                    ))}
            </select>
            <label for="floor-selector">Этаж</label>
        </div>
    );
}

function RoomSection(props) {

    const nums = []
    for (let num = 1; num <= props.roomsNumber; num++) {
        nums.push( num );
    }

    return (
        <div className="room-section">
            <select required name="room" id="room-selector">
                <option value="" selected disabled>-</option>
                { nums.map(num => (
                        <option value={num}>{num}</option>
                    ))}
            </select>
            <label for="room-selector">Номер</label>
        </div>
    );
}

function TimeSection(props) {
    const firstHour = props.firstHour;
    const lastHour = props.lastHour; 
    const nums = [];

    for (let num = firstHour; num <= lastHour; num++) {
        nums.push( num );
    }

    return (
        <div className="date-n-time-section">
            <div className="date-section">
                <label for="date-selector">День</label>
                <input required type="date" name="date" id="date-selector" />
            </div>
            <div className="time-section">
                <label for="time-selector">Время</label>
                <select required name="time" id="time-selector">
                    <option value="" selected disabled>-</option>
                    { nums.map(num => (
                            <option value={num}>{num}:00 - {num + 1}:00</option>
                        ))}
                </select>
            </div>
        </div>
    );
}

function CommentSection(props) {
    return (
        <div className="comment-section">
            <textarea name="comment" id="comment-area">

            </textarea>
            <label for="comment-area">Комментарий</label>
        </div>
    );
}

function ButtonSection(props) {
    return (
        <div className="buttons-section">
            <button className="submit" onClick={props.onSubmit} type="submit">Отправить</button>
            <button className="clear" type="reset">Очистить</button>
        </div>
    );
}


export default App;
