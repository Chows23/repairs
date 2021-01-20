import React from 'react';
import './App.css';
import RepairForm from './components/RepairForm';
import Repair from './components/Reapir';
import Pagination from './components/Pagination';
import paginate from './components/paginate';
import ListGroup from './components/ListGroup';

class App extends React.Component {
  repairId = 0;

  state = {
    repairInput: "",
    repairs: [],
    taskGroups: ['All Tasks', 'Incomplete', 'Completed'],
    selectedGroup: 'All Tasks',
    pageSize: 5,
    currentPage: 1,
  }

  async componentDidMount() {
    const url = 'https://5ed0108416017c00165e327c.mockapi.io/api/v1/repairs';
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result[3])
    this.setState({
      repairs: result,
    })
  }


  //--------                   RepairForm                     ---------

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page })
  }

  createNewRepair = e => {
    this.setState(prevState => ({
      repairs: [...prevState.repairs, { task: prevState.repairInput, id: this.state.repairs.length + this.repairId++, completed: false }],
      repairInput: "",
    }));
    // console.log(this.state.repairs.length);
    e.preventDefault();
  }

  updateRepairField = e => {
    // this is better, but we'll use the bottomr one for today
    // this.setState({[e.target.name]: e.target.value});
    this.setState({ repairInput: e.target.value });
    console.log(e.target.value);
    console.log(this.state.repairs)
  }



  //----------              Pagination                          -----------

  removeRepair = repair => {
    this.setState(prevState => ({
      repairs: prevState.repairs.filter(repairElement => repairElement !== repair)
    }));
  }

  checkBox = (e) => {
    console.log("click", e.target.closest("li"))
    const li = e.target.closest("li")
    li.classList.toggle("completed");

    this.setState(prevState => ({
      repairs: prevState.repairs.map(repair =>
        repair.id === li.getAttribute('id') ?
          { ...repair, completed: !repair.completed } : repair
      )
    }))
  }

  //----                    ListGroup                      ------------

  handleGroupSelect = (group) => {
    // console.log(group);
    this.setState({ selectedGroup: group, currentPage: 1 })
  }




  render() {
    const { repairs: AllRepairs, pageSize, currentPage, taskGroups, selectedGroup } = this.state;

    const filteredTasks =
      selectedGroup !== 'All Tasks'
        ? AllRepairs.filter((task) => {
          return selectedGroup === 'Completed'
            ? task.completed
            : !task.completed;
        })
        : AllRepairs;
    const repairs = paginate(filteredTasks, pageSize, currentPage);
    // console.log(repairs);

    return (
      <section className="fixmeapp">
        <header className="header">
          <h1>rep<span>🔥</span>irs</h1>
          <RepairForm update={this.updateRepairField} add={this.createNewRepair} value={this.state.repairInput} />
        </header>
        <section className="main">
          <Repair repairs={repairs} delete={this.removeRepair} check={this.checkBox} />
        </section>
        <Pagination
          itemCount={filteredTasks.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        <ListGroup
          groups={taskGroups}
          selectedGroup={selectedGroup}
          onGroupSelect={this.handleGroupSelect}
        />
      </section>

    )
  }
}


export default App;
