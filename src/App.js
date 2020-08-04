import React from 'react'
import './App.css'
import './bootstrap.min.css'
import Navbar from './components/Navbar'
import { Form, Button, Container, Row, Col, Jumbotron} from 'react-bootstrap'


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.searchChange = this.searchChange.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
        search: '',
        caption:'',
        loading: false
    }
  }

  submit(e){
    e.preventDefault()
    this.setState({loading: true})
    let patt1 = /v=/g
    let patt2 = /be\//g
    let index = 0
    let id = ''

    if (patt1.test(this.state.search)===true)  {
      index = patt1.lastIndex
      id = this.state.search.substring(index)
    }
    
    if (patt2.test(this.state.search)===true)  {
      index = patt2.lastIndex
      id = this.state.search.substring(index)
    }

    fetch(`http://142.93.114.24/?videoID=${ id }`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      mode: "cors"
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        caption: data['text'],
        loading: false
      })
    })
    .catch(err => console.log(err))


  }

  searchChange(e){
    this.setState(
      {search: e.target.value}
    )
  }

  render(){
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Form onSubmit={this.submit} className="form">
              <Form.Row>
                <Col lg={10} xs={9}>
                  <Form.Control 
                    type="text" 
                    placeholder="video url"
                    value={this.state.search}
                    onChange={this.searchChange}
                  />
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    Search
                    {/*this.state.loading && <Spinner animation="border" />*/}
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Row>
          <Row>
            <Col xs={12}>
            <Jumbotron>
              <p>
                {this.state.caption}
              </p>
            </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}