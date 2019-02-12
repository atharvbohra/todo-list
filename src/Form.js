import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            heading: '',
            description: ''
        }
        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        if (this.state.heading.length && this.state.description.length) {
            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        } else {
            window.confirm("Please enter valid input !!! Try again");
        }
    }

    render() {
        return (
            <div className='form'>
                <label style={{display: 'block', fontWeight:'bold'}}>Heading</label>
                <input style={{ marginBottom: '0.3rem' }} type='text' name='heading'
                    value={this.state.heading} onChange={(event) => this.handleChange(event)} />
                <label style={{display: 'block',fontWeight:'bold'}}>Description</label>
                <input type='text' name='description'
                    value={this.state.description} onChange={(event) => this.handleChange(event)} />
                <input style={{ margin: '0.6rem 3.5rem', display: 'block', padding:'4px', background: 'blue', color:'#fff'}} type='button'
                    value='Submit' onClick={() => this.handleSubmit()} />
            </div>
        )
    }
}

export default Form;