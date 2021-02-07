import React,{useEffect,useState} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function App() {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [bpmData, setBpmData ]=useState([]);
  const [Dates, setDates ]=useState([]);


  useEffect(async () => {
    const result = await axios(
      'http://localhost:5000/patient/getPatientData',
      
    );
      
     
      // setData(result.data)
      setTimeout(() => {
        var array=result.data
        array.map((info,i)=>{
        let start=info.studyStartTime.slice(0,21);
        let end=info.studyEndTime.slice(0,21)
        array[i].studyStartTime=start;
        array[i].studyEndTime=end;
        })
        setData(array)
      }, 1000);

     

      if(chartData.length !=0 ){
      chartData.events.map((bpm)=>{
        
        setBpmData(bpmData => [bpm.HeartRate,...bpmData])
      
        setDates(bpmData => [bpm.Date,...bpmData])
     })
    }

    // 
    // handleDateForm();
  }, [chartData])

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: chartData.name
    },
    yAxis: {
      type: 'linear',
  },
  // Categories are set by using an array
  xAxis: {
      categories: Dates
  },
    series: [
      {
        data: bpmData
      }
    ]
  };
 
const handleChartData =(rowData)=>{
setchartData(rowData);
setBpmData([]);
setDates([]);
}



  return (
    <div>
     <MaterialTable
    title="Cardiodiagnostics Patients"
    onSelectionChange={rows => setChecked(rows)}

    columns={[
    { title: 'PatientID', field: '_id'},
    { title: 'Name', field: 'name'},
    { title: 'Date of Birth', field: 'dateOfBirth'},    
    { title: 'Study Start Date', field: 'studyStartTime'},
    { title: 'Study End Time', field: 'studyEndTime'},
    { title: 'Device Serial Number', field: 'deviceId.serialNumber' },
    { title: 'Total Number Of Events', field: 'events.length' }
            
    ]}
    onRowClick={(event,rowData)=> handleChartData(rowData)}

    options={{
      selection: false,
      showSelectAllCheckbox: false,
      sorting: true,
      rowStyle: {
      backgroundColor: '#ffdae0',
      },
      headerStyle: {
      backgroundColor: '#01579b',
      color: '#FFF'
      }
      }}
      
      data={data}

     />

      <div style={{width:'100%',backgroundColor:'#01579b',height:'30px',marginTop:'4px',color:'#FFF'}}>
      <div style={{float:'left'}}> Minimum BPM: {Math.min.apply(Math,bpmData)}</div>
      <div style={{float:'left',marginLeft:'36%'}}>Average BPM: {bpmData.length != 0 ? bpmData.reduce((a, b) => a + b) / bpmData.length : null} </div>
      <div style={{marginLeft:'86%'}}>Maximum Bpm: {Math.max.apply(Math,bpmData)}</div>
      </div>

      <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    </div>
  )
}


