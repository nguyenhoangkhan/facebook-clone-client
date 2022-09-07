const BinContent = () => {
  return (
    <div className="bin-content-wrapper">
      <div className="bin-content-prompt">
        Mục trong thùng rác chỉ hiển thị với bạn.
      </div>
      <div className="bin-content-options">
        <div className="bin-content-options-left">
          <input type="checkbox" id="bin-items-all" />
          <label htmlFor="bin-items-all">Tất cả</label>
        </div>
        <div className="bin-content-options-right">
          <div className="bin-content-options-right-items">
            <div className="bin-content-options-right-item bin-content-options-right-item-storage">
              Lưu trữ
            </div>
            <div className="bin-content-options-right-item bin-content-options-right-item-restored">
              Khôi phục
            </div>
            <div className="bin-content-options-right-item bin-content-options-right-item-delete">
              Xóa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinContent;
