import React, { useState } from "react";
import "../styles/OpenOrders.scss";

const OpenOrders = ({
  orders,
  hideOtherPairs,
  showTradeHistory,
  setHideOtherPairs,
  setShowTradeHistory,
  cancelOrder,
  cancelAllOrders,
}) => {
  const [activeTab, setActiveTab] = useState("open");

  return (
    <div className="open-orders">
      <div className="tabs">
        <button
          className={activeTab === "open" ? "active" : ""}
          onClick={() => setActiveTab("open")}
        >
          OPEN ORDERS
        </button>
        <button
          className={activeTab === "positions" ? "active" : ""}
          onClick={() => setActiveTab("positions")}
        >
          POSITIONS
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          TRADE HISTORY
        </button>
      </div>

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={hideOtherPairs}
            onChange={() => setHideOtherPairs(!hideOtherPairs)}
          />
          Hide Other Pairs
        </label>

        <button className="cancel-all" onClick={cancelAllOrders}>
          Cancel All
        </button>
      </div>

      {activeTab === "open" && (
        <>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <span className="team">{order.team}</span>
                  <span className="percentage">
                    {order.filled ? "0%" : ""}
                    <div className="progress-bar">
                      <div className="progress" style={{ width: "0%" }}></div>
                    </div>
                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
                <div className="order-subheader">
                  <span>Limit /Buy {order.date}</span>
                </div>
                <div className="order-details">
                  <div className="detail-row">
                    <span>Filled / Amount</span>
                    <span>
                      {order.filled || "0.00"} / {order.shares || "0.01"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Price</span>
                    <span>{order.price || "30¢"}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">No open orders</div>
          )}
        </>
      )}

      {activeTab === "positions" && (
        <div className="no-orders">No open positions</div>
      )}

      {activeTab === "history" && (
        <div className="no-orders">No trade history</div>
      )}
    </div>
  );
};

export default OpenOrders;
