import React, { Component } from 'react';
import UserList from '../containers/UserList';
import OrderList from '../containers/OrderList';
import MovieList from '../containers/MovieList';

export default class Admin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
  }

  showContent (selectedTabIndex) {
    this.setState({ selectedTabIndex });
  }

  render () {
    const tabs = [
      { title: 'Users', content: <UserList /> },
      { title: 'Orders', content: <OrderList /> },
      { title: 'Movies', content: <MovieList /> }
    ];
    return (
      <div className='admin'>
        <div className='tab'>
          {tabs.map((tab, i) => {
            const linkClassName = i === this.state.selectedTabIndex
              ? 'tablink tablink-active'
              : 'tablink';
            return (
              <button
                key={i}
                className={linkClassName}
                onClick={this.showContent.bind(this, i)}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        {tabs.map((tab, i) => {
          const contentStyle = i === this.state.selectedTabIndex
            ? { display: 'block' }
            : { display: 'none' };
          return (
            <div className='tabcontent' style={contentStyle}>
              {tab.content}
            </div>
          );
        })}
      </div>
    );
  }
}