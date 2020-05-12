import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

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
                key={index}
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

export default Chart