import React, {useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Detail from "../Detail/Detail";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    BrowserRouter,
    useHistory
} from 'react-router-dom';
import useSWR from "swr";

const endpoint =  "http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2";

const columns = [
    {
        id: 'accountId',
        label: 'AccountId',
        minWidth: 170
    },

    {   id: 'accountType',
        label: 'AccountType',
        minWidth: 170 },
    {
        id: 'displayName',
        label: 'DisplayName',
        minWidth: 170,
    },
    {
        id: 'role',
        label: 'Role',
        minWidth: 170,
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    selected: {
        backgroundColor: "red !important",
        color: " #fff !important",
        "&:hover": {
            backgroundColor: "transparent !important",
        },
    },
    hover: {
        "&:hover": {
            backgroundColor: "rgb(255, 99, 132) !important",
            color: " #fff !important",
        },
    },
});

export default function DataTable() {
    let history = useHistory();
    const { data, error} =useSWR(endpoint)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    function handleRowDetail(id) {
        history.push("/detail/".concat(id), { id});
    }

    const rows = useMemo(()=> {
        if(!data) return []
     return  data.nodes.map(item =>({
                id: item.id,
                accountId : item.accountId,
                accountType: item.accountType,
                displayName: item.displayName,
                role: item.role
        }))
    },[data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>

                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                        <TableRow hover
                                                  role="checkbox"
                                                  tabIndex={-1}
                                                  key={row.id}
                                                  classes={{
                                                      root: classes.row,
                                                      hover: classes.hover,
                                                      selected: classes.selected,}}
                                                  onClick={() => handleRowDetail(row.id)}

                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>

                                                );
                                            })}
                                        </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

    );
}
