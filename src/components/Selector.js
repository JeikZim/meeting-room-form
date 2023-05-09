import React from "react";

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

export default Selector;