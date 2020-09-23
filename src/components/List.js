import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        id: '',
        name: '',
        email: '',
        dob: '',
        phone: '',
      }]
    }
  }

  componentDidMount() {
    axios.get(
      'http://ec2-13-127-22-123.ap-south-1.compute.amazonaws.com/api/userdata/?format=json',
    ).then(rsp => {
      // console.log(rsp.data)
      this.setState({ data: rsp.data })
    }).catch((err) => {
      this.setState({
        data: [{
          id: '',
          name: '',
          email: '',
          dob: '',
          phone: '',
        }]
      })
      console.log(err)
    })
  }

  render() {

    return (
      <Container>

        <div style={{ textAlign: 'center' }}>
          <Typography variant="h3" noWrap>
            User data list
          </Typography>
          <Divider />
        </div>

        <TableContainer component={Paper} >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">E-Mail</StyledTableCell>
                <StyledTableCell align="right">Date of Birth</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.dob}</StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container >

    );
  }
}
