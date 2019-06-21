
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import './table.scss';

class Table extends Component {

    render() {
        const { headers, data } = this.props;
        return (
            <div className="soundcheck-table">
                <div className="soundcheck-table_header">
                    {headers.map((title, index) => <TableHeaderItem key={index} title={title} />)}
                </div>
                <div className="soundcheck-table_content">
                    {data.map((row, index) => <TableRow key={index} row={row} />)}
                </div>
            </div>
        )
    }
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.array.isRequired,
};

const TableRow = ({ row }) => {
    return (
        <div className="soundcheck-table_row">
            {row.map((cell, index) => {
                if (cell.component) {
                    return <div key={index} className="soundcheck-table_data" >{cell.component}</div>
                } else {
                    return <div key={index} className="soundcheck-table_data" dangerouslySetInnerHTML={{__html: cell.value}}></div>
                }
            })}
        </div>
    )
}

const TableHeaderItem = ({ title }) => {
    return (<div className="soundcheck-table_header-item">{title}</div>)

}

export default Table;