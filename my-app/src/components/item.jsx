import React from 'react'

export class Item extends React.PureComponent {
  render() {

    const {data} = this.props

    return (
      <div key={data.id} className={'post-sec'}>
        { data.thumbnail !== 'self' ? <img src={data.thumbnail} alt=''/> : null }
        <p>{data.title}</p>
        <p>Commentars amount: {data.num_comments}</p>
        <a href={`https://www.reddit.com/${data.permalink}`} target='_blank'  rel="noreferrer">link</a>
      </div>
    )
  }
}