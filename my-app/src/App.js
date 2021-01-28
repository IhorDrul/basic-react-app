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
    fetch('https://www.reddit.com/r/reactjs.json?limit=10')
    .then(response => response.json())
    .then(({data}) => {
      this.setState({
        items: data.children,
        isLoading: false
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

  render() {
    const {items, isLoading, enableAutoRefresh } = this.state
    console.log(items.data)
    const itemsSortByComments = items.sort(
      (a, b) => b.data.num_comments - a.data.num_comments
    )
    return(
      <div className="App App-logo">
        <h1>Top commended</h1>
        <button 
          type='button' 
          onClick={this.updateAutoRefresh}
        >
          {enableAutoRefresh ? 'Stop' : 'Start'} auto-refresh
        </button>
        {isLoading 
          ? <p>...Loading</p> 
          : (
          itemsSortByComments.map(item => <Item key={item.data.id} data={item.data}/>)
        )}
      </div>
    )
  }
}