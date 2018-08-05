import React, { Component } from 'react';
import axios from 'axios';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import './static/css/news.css';


class News extends Component {
  constructor(){
    super();
    this.newsArray = new Array();
    this.state = {
      "newsInfo": []
    }

    this.getNewsList = this.getNewsList.bind(this);

  }

  componentDidMount() {
    this.getNewsList();
  }

  getNewsList() {
    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
    .then((results) => {
      var data = results.data.Data;
      for (var pro in data) {
        const publishedOn = data[pro].published_on;
        const title = data[pro].title;
        const url = data[pro].url;
        const sourceFrom = data[pro].source;
        const body = data[pro].body;
        const categories = data[pro].categories;
        const img = data[pro].source_info.img;

        var newsInfo = {
          'publishedOn' : publishedOn,
          'title' : title,
          'url' : url,
          'sourceFrom' : sourceFrom,
          'body' : body,
          'categories' : categories,
          'img' : img
        }
        this.newsArray.push(newsInfo);
      }

    }).then(() => this.setState({ newsInfo: this.newsArray }));
  }

  render() {
    return (
      <div >
        <div>
          News
        </div>
        <div>
          <ListGroup>
            {this.state.newsInfo.map(function(news,index){
              return <ListGroupItem>
                <div className="listDiv">
                  <div className="listImg">
                    <img src={news.img}/>
                  </div>
                  <div className="listMainBody">
                    <h6>{news.categories}</h6>
                    <div className="listBodyTitle">
                      <h5>{news.title}</h5>
                    </div>
                    <div>
                      <p>{news.body}</p>
                    </div>
                    <div>
                      <h5>Read More From <a href={news.url}>{news.sourceFrom}</a></h5>
                    </div>
                  </div>
                </div>
              </ListGroupItem>;
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default News
