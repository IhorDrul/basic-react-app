import React, {Component} from 'react'

export class Item extends React.Component {
  render() {

    const {data} = this.props
    
    return (
      <div key={data.id} className={'post-sec'}>
        { data.thumbnail !== 'self' ? <img src={data.thumbnail} alt='my image'/> : null }
        <p>{data.title}</p>
        <p>{data.num_comments}</p>
        <a href={`https://www.reddit.com/${data.permalink}`} target='_blank'>link</a>
      </div>
    )
  }
}