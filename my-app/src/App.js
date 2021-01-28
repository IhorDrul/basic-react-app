import './App.css'
import React from 'react'
import { Item } from './components/item'

export class App extends React.Component {

  constructor() {
    super()

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    this.setState({
      isLoading: true
    })
    fetch('https://www.reddit.com/r/reactjs.json?limit=300')
    .then(response => response.json())
    .then(({data}) => {
      this.setState({
        items: data.children,
        isLoading: false,
        minComments: 0
      })
    })
  }

  updateAutoRefresh = () => {
    if(this.state.enableAutoRefresh) {
      this.setState({enableAutoRefresh: false})
      clearInterval(this.autoRefresh)
    }else{
      this.setState({enableAutoRefresh: true})
      this.autoRefresh = setInterval(this.getItems, 3000)
    }
  }

  updateMinComments = (event) => {
    this.setState({
      minComments: +event.target.value
    })
  }

  getItemsByComments = (items, minComments) => {
    return items
      .sort((a, b) => b.data.num_comments - a.data.num_comments)
      .filter(item => item.data.num_comments >= minComments)
  }

  render() {
    const {items, isLoading, enableAutoRefresh, minComments } = this.state
    const itemsByComments = this.getItemsByComments(items, minComments)

    return(
      <div className="App App-logo">
        <h1>Top commended</h1>
        <div>
          <p>Current filter: {minComments}</p>
          <button 
            type='button' 
            onClick={this.updateAutoRefresh}
          >
            {enableAutoRefresh ? 'Stop' : 'Start'} auto-refresh
          </button>
        </div>
        <input 
          className='range-input'
          type='range' 
          value={minComments} 
          onChange={this.updateMinComments}
          min={0} 
          max={300} 
        />
        {(isLoading 
          ) ? ( <p>...Loading</p> 
          ) : ( itemsByComments.length > 0 
            ? itemsByComments.map(item => <Item key={item.data.id} data={item.data}/>)
            : <p>No results</p>
        )}
      </div>
    )
  }
}