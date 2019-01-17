import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: undefined,
      data: [],
    }
  }

  myclick(e) {
    const endpoint = e.target.innerText
    axios
      .get(`http://localhost:3000/api/${endpoint}`)
      .then((res) => this.setState({data: res.data, which: endpoint}))
  }

  render() {
    console.log('f')
    return (<div>
      <button onClick={(e) => this.myclick(e)}>campuses</button>
      <button onClick={(e) => this.myclick(e)}>students</button>
      <div>
        {this.state.which === 'campuses' && this.state.data.map((i) => (<div>{i.name} {i.address} {i.description}</div>))}
        {this.state.which === 'students' && this.state.data.map((i) => (<div>{i.firstName} {i.lastName} {i.email} {i.gpa}</div>))}
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
