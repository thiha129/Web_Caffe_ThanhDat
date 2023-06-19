import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import cx from "classnames";
import Cover from "./Cover.js";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
    generateRows,
    defaultColumnValues,
} from '../components/demo-data/generator';


import { DataGrid } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
const getRowId = row => row.id;

export default () => {
    const srcs = [
        "https://images.unsplash.com/photo-1498462440456-0dba182e775b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    ];

    const useSrcs = () => {
        const [selectedSrc,] = useState(srcs[0]);
        return {
            cover: srcs.map(src =>
                src === selectedSrc ? <Cover key={src} src={selectedSrc} /> : null
            )
        };
    };
    const { cover } = useSrcs();

    const [columns] = useState([
        { name: 'name', title: 'Sản Phẩm' },
        // { name: 'gia', title: 'Giá' },
        { name: 'money', title: 'Giá' },
        { name: 'loai', title: 'Loại' },
        { name: 'sl', title: 'Số lượng' },
        { name: 'car', title: 'Thương hiệu', },
        // { cover }
    ]);
    const [rows, setRows] = useState(generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 8,
    }));
    const [editingStateColumnExtensions] = useState([
        { columnName: 'name', editingEnabled: false },
    ]);

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                    defaultEditingRowIds={[0]}
                    columnExtensions={editingStateColumnExtensions}
                />
                <Table />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </Paper>
    );
};
