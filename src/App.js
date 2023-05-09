import React from "react";
import "./App.css";
import {
    ButtonSection, 
    CommentSection, 
    FloorSection, 
    HeaderSection, 
    RoomSection, 
    TimeSection, 
    TowerSection,
    SuccessMessage
} from "./components/sections"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formSucces: false
        }
    }

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

        let errCount = 0;

        if (!formData.tower || formData.tower === '-') {
            console.log('tower');
            this.sendInvalidMessage('tower-selector', 'Выберите башню.');
            errCount++;
        } 
        if (!formData.floor || formData.floor === '-') {
            console.log('floor');
            this.sendInvalidMessage('floor-selector', 'Выберите этаж.');
            errCount++;
        } 
        if (formData.room && formData.room !== '-') {
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
            this.sendInvalidMessage('room-selector', 'Выберите комнату.');
            errCount++;
        } 
        if (formData.date && formData.time && formData.time !== 'чч:мм-чч:мм') {
            const arr = formData.date.split('-');
            const 
                year = arr[0],
                month = arr[1] - 1,
                day = arr[2]
                // Дата и время бронирования в миллисекундах
            const meetingDate = Date.UTC(year, month, day) + formData.time * 60 * 60 * 1000;
            const dateNow = new Date();
            // Проверка: до дня бронирования должно быть НЕ БОЛЬШЕ 30 дней (в миллисекунлах)
            if (meetingDate - dateNow > 2592000000) {
                console.log('too match time')
                this.sendInvalidMessage('date-selector', "Переговорную можно бронировать не раньше, чем за месяц.");
                errCount++;
            } 
        } 
        if (!formData.date) {
            console.log('date')
            this.sendInvalidMessage('date-selector', 'Выберите дату.')
            errCount++;
        }
        if (!formData.time || formData.time === 'чч:мм-чч:мм') {
            console.log('time')
            this.sendInvalidMessage('time-selector', 'Выберите время.')
            errCount++;
        }
        if (formData.comment.length > 299) {
            formData.comment = formData.comment.slice(0, 300);
        } 

        if (errCount > 0) {
            return;
        }

        const dataJSON = JSON.stringify(formData) 
        
        console.log(dataJSON)
        this.setState(() => {
            return {
                formSucces: true
            }
        });
    };

    sendInvalidMessage(id, message) {
        const el = document.getElementById(id);
        el.classList.add('invalid-field');
        el.setAttribute('title', message)
        setTimeout(() => {
            el.classList.remove('invalid-field');
            el.setAttribute('title', '')
        }, 10000);
    }

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
                <form id="main-form" className={"form" + (this.state.formSucces ? ' is-hidden' : '')}>
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
                <SuccessMessage href={"#"} isVisible={this.state.formSucces} />
            </div>
        );
    }
}

export default App;
