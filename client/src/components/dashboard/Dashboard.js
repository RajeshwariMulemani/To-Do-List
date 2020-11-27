import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import "react-datepicker/dist/react-datepicker.css";
import {addNotes,getNotes} from "../../actions/notesAction"
import { toast } from 'react-toastify';
import Moment from 'react-moment';
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      addform:false,
      startDate:"",
      showNotes:false,
      errors: {},
      selectedDate:"",
      title:"",
      notes:"",
      get_user_notes:[]
     
    };

    this.onChange = this.onChange.bind(this);
  }

  
  componentDidMount() {

this.setState({selectedDate:new Date(),startDate:new Date()})

this.props.getNotes({userId:this.props.auth.user.id,date:new Date()})
 
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }


    if (nextProps.notes.addNotes_success.message != undefined) {
      this.setState({ addNotes_success: nextProps.notes.addNotes_success , title:"",notes:""});

      
    }

    if( nextProps.notes.get_user_notes !=undefined){
      this.setState({get_user_notes:nextProps.notes.get_user_notes})
    }


  }

  componentDidUpdate(prevProps, prevStats) {
		if (this.state.addNotes_success != prevStats.addNotes_success) {
		
      this.notify(this.state.addNotes_success.message)
      
      57953  //200 // 560000/ 1650
      75390
      3600
    }
  }

  componente

  notify=(message)=>{
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
  });
  }

  setStartDate=(date)=>{

    console.log(date)

    this.setState({startDate:date})
    this.setState({showNotes:true,selectedDate:date});

    this.props.getNotes({userId:this.props.auth.user.id,date:new Date(date)})
 
  }

openModal=()=> {
    this.setState({showNotes:true});
  }
 
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value ,errors:{}});
  }
 
  closeModal=()=>{
    this.setState({modalIsOpen:false});
  }

 afterOpenModal=()=> {
    // references are now sync'd and can be accessed.
   // subtitle.style.color = '#f00';
  }

  onSubmit(e){

    e.preventDefault()
    console.log("Hello")
    //this.setState({showNotes:false});

    let data={
      title:this.state.title,
      notes:this.state.notes,
      notes_date:new Date(this.state.selectedDate),
      userId:this.props.auth.user.id
    }

  //  this.notify("Succesfully Added")

  this.props.addNotes(data)

 


  }

  render() {
    const { errors } = this.state;

    console.log(this.state.get_user_notes,'dddddd')
       
  
    const education = this.state.get_user_notes.map(data => (
      <tr key={data._id}>
        <td>{data.title}</td>
        <td>{data.notes}</td>
        <td>
          <Moment format="YYYY/MM/DD">{data.notes_date}</Moment>
         
        </td>
        <td>
        
        </td>
      </tr>
    ));
   
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4 className="mb-10">Select date to add note</h4>
             <div className="mt-4">
    <DatePicker
      selected={this.state.startDate}
      onChange={date => this.setStartDate(date)}
      inline
    />

</div>
             
            </div>
            <div className="col-md-8">
          
      {this.state.showNotes?  <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            
    <h1 className="display-5 text-center">Add Notes</h1>
              <p className="lead text-center">
                { <Moment format="YYYY/MM/DD">{this.state.selectedDate}</Moment> }
              </p>
              
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="* Notes"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.onChange}
                  error={errors.notes}
                />
               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>:""}
            </div>
          </div>

          <div className="container" style={{marginTop:"50px"}}>
          <div className="row">
            <div className="col-md-8 m-auto">

              <h4>Saved Notes for  { <Moment format="YYYY/MM/DD">{this.state.selectedDate}</Moment> } </h4>
               
               <hr></hr>
                { this.state.get_user_notes.length >0?<table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Notes</th>
                    <th>NotesDate</th>
                    <th />
                  </tr>
                  {education}
                </thead>
              </table>:<h3>No notes saved please select date to add Notes</h3>}
              
             
            </div>
            </div>
          </div>

           
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
 
  auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
 
  auth: state.auth,
  errors:state.errors,
  notes:state.notes
  
});

export default connect(mapStateToProps,{addNotes,getNotes})(
  Dashboard
);
