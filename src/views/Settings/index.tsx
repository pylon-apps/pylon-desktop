import { Empty } from "antd";

function Settings() {
  return (
    <div>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>There's nothing here yet. Stay tuned!</span>}
      />
    </div>
  );
}

export default Settings;
