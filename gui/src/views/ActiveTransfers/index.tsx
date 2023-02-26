import { Empty } from "antd";

function ActiveTransfers() {
  return (
    <div>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>There's nothing here yet. Stay tuned!</span>}
      />
    </div>
  );
}

export default ActiveTransfers;
