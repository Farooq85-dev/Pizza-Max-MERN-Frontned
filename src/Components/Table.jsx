import { Table } from "antd";
import PropTypes from "prop-types";

const TableComp = ({ columns, data }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={{
      pageSize: 5,
    }}
  />
);

TableComp.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default TableComp;
