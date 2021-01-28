import './App.css'
import React from 'react'

export class App extends React.Component {

  constructor() {
    super()

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/reactjs.json?limit=10')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          items: data.data.children
        })
      })
  }

  render() {
    const {items} = this.state
    return(
      <div className="App App-logo">
        <h1>Top commended</h1>
        {items.map(item => (
          <div key={item.data.id} className={'post-sec'}>
            { item.data.thumbnail !== 'self' ? <img src={item.data.thumbnail} alt='my image'/> : null }
            <p>{item.data.title}</p>
            <p>{item.data.num_comments}</p>
            <a href={item.data.permalink} target='_blank'>link</a>
          </div>
        ))}
      </div>
    )
  }
}