import { Table } from "antd";
import PropTypes from "prop-types";

const TableComp = ({ columns, data, pageSize }) => (
  <Table
    className="overflow-x-auto"
    columns={columns}
    dataSource={data}
    bordered
    pagination={{
      pageSize: pageSize,
    }}
  />
);

TableComp.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default TableComp;
