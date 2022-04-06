import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideMenu from '../components/SideMenu.js';
import SmartTable from '../components/SmartTable.js';
import Loading from '../components/Loading.js';
import {connect} from 'react-redux';
import {getLeagueList} from '../actions';

class LeagueList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLeagueList();
  }

  render() {
    if(this.props.isLoading) {
      return<Loading />;
    }
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={3} xl={2} style={{backgroundColor: '#f7f7f7', borderRight: '1px solid #ececec'}} >
              <SideMenu />
            </Col>
            <Col lg={9} xl={10} style={{paddingTop: '1em'}}>
              <Breadcrumb>
                <Breadcrumb.Item href="#/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>League</Breadcrumb.Item>
              </Breadcrumb>
              <SmartTable
                columns={[
                  {name: 'Rank', field: 'rank'},
                  {name: 'Owner', field: 'ownerName'},
                  {name: 'Script', field: 'scriptName'},
                  {name: 'Joined', field: 'joinedAt', format: 'datetime'},
                  {name: 'Fights', field: 'fights_total', format: 'number'},
                  {name: 'Wins', field: 'fights_win', format: 'number'},
                  {name: 'Losts', field: 'fights_lose', format: 'number'},
                  {name: 'Win %', field: 'fights_win', format: (x, row) => {
                    if(row.fights_total === 0) {
                      return '-';
                    }
                    const ratio = row.fights_win/row.fights_total;

                    return `${(100*ratio).toFixed(1)}%`;
                  }},
                  {name: 'Score', field: 'score', format: 'number'},
                  {name: 'Error', field: 'fights_error', format: [
                    (x) => x/0.7,
                    'scale'
                  ]},
                ]}
                data={this.props.leaguePage}
                onPageRequest={(page) => this.props.getLeagueList(page)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leaguePage: state.league.page,
  isLoading: state.loading.LEAGUE_LIST
});

const mapDispatchToProps = (dispatch) => ({
  getLeagueList: (page, pageSize) => dispatch(getLeagueList(page, pageSize))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueList);
