import React from 'react';
import axios from 'axios';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

let genLink = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
let prefLink = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='
const key = '3ePPUxU72WKSjsz2CaP2T3h8rPDPqktKn0yj6Y7c'
let config = {'X-API-KEY': key};
let yearData = [
  {"year":1960},{"year":1965},{"year":1970},{"year":1975},{"year":1980},
  {"year":1985},{"year":1990},{"year":1995},{"year":2000},{"year":2005},
  {"year":2010},{"year":2015},{"year":2020},{"year":2025},{"year":2030},
  {"year":2035},{"year":2040},{"year":2045}]
const colorList = [
  "#ff0000",  "#ffff00",  "#00ff00", "#00fff0", "#0000ff",  
  "#8800ff",  "#ff00e6",  "#ff7b00", "#00ff6a", "#0088ff",
  "#ff0000",  "#ffff00",  "#00ff00", "#00fff0", "#0000ff",  
  "#8800ff",  "#ff00e6",  "#ff7b00", "#00ff6a", "#0088ff",
  "#ff0000",  "#ffff00",  "#00ff00", "#00fff0", "#0000ff",  
  "#8800ff",  "#ff00e6",  "#ff7b00", "#00ff6a", "#0088ff",
  "#ff0000",  "#ffff00",  "#00ff00", "#00fff0", "#0000ff",  
  "#8800ff",  "#ff00e6",  "#ff7b00", "#00ff6a", "#0088ff",
  "#ff0000",  "#ffff00",  "#00ff00", "#00fff0", "#0000ff",  
  "#8800ff",  "#ff00e6",  "#ff7b00", "#00ff6a", "#0088ff",
];

class Chart extends React.Component{
	render () {
    const display = this.props.prefData? 
          this.props.prefData.map((ele, index) => {
            return(
              <Line 
                type="monotone" 
                name={ele.prefName}
                dataKey={'value'+Number(index+1)} 
                stroke={colorList[index]} />
            )
          }) : ''
  	return (
      <ResponsiveContainer>
      <LineChart 
        data={this.props.data}
        margin={{ top: 30, right: 50, left: 50, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
          <Label value='年' offset={-10} position='insideBottomRight'/>
        </XAxis>
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}>
          <Label value='人口数' offset={-20} position='insideTopLeft'/>
        </YAxis>
        <Tooltip 
          formatter={(value) => 
            new Intl.NumberFormat('en').format(value)}/>
        {display}
      </LineChart>
      </ResponsiveContainer>

    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: yearData,
      prefData: '',
    }
    this.handleLoadData = this.handleLoadData.bind(this)
  }
  componentDidMount() {
    axios.get(genLink, {headers: config}).then((response) => {
      let resultData = response.data.result 
      this.setState({prefData: resultData})
    })
  }
  handleLoadData(event){
    let regionIndex = Number(event.target.id.slice(5))
    let tempArr = this.state.data
    if(tempArr[0].hasOwnProperty('value'+regionIndex)){
      for(let i=0; i<tempArr.length; i++){
        delete tempArr[i]['value'+regionIndex]
      }
      this.setState({data: tempArr})
    }
    else{
      axios.get(prefLink+regionIndex, {headers: config}).then((response) => {
        let resultData = response.data.result.data[0].data
        
        for(let i=0; i<tempArr.length; i++){
          tempArr[i]['value'+regionIndex] = resultData[i].value
        }
        this.setState({data: tempArr})
      })
    }
  }
  render(){
    const display = this.state.prefData? 
      this.state.prefData.map((ele, index) => {
          return(
            <span>
              <input type="checkbox" 
                onClick={this.handleLoadData} 
                id={'value'+Number(index+1)} />
              <label>{ele.prefName}</label>
            </span>
          )
      }) : 'Loading buttons...'
    return(
      <div className='main'>
        <p>都道府県人口構成 (1960-2045)</p>
        <div className='chartSec'>
        <Chart 
          data={this.state.data}
          prefData={this.state.prefData}
          color={this.state.color}/>
        </div>
        <div className='buttonSec'>        
          {display}
        </div>
      </div>
    )
  }
}

export default App;
