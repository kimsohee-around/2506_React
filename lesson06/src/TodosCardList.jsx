import "./todocardList.css";
import { FaTrash } from "react-icons/fa";
export default function TodosCardList({ todos, onCheckedUpdate, onRemoved }) {
  return (
    <div className="container">
      <div className="timeline">
        {todos.map((item, idx) => {
          return (
            <div className="timeline-item" key={idx}>
              <div
                className={`timeline-content ${
                  item.checked ? "completed" : ""
                }`}
              >
                <div className="time">{item.time}</div>
                <div className="task">{item.text}</div>
                <div className="checkbox-container">
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`task${idx}`}
                      checked={item.checked || false}
                      onChange={() => onCheckedUpdate(item.time, item.checked)}
                    />
                    <label
                      htmlFor={`task${idx}`}
                      className={`checkbox-label ${
                        item.checked ? "checked" : ""
                      }`}
                    />
                    <span
                      className={`status-text ${
                        item.checked ? "completed" : ""
                      }`}
                    >
                      {item.checked ? "완료" : "미완료"}
                    </span>
                  </div>
                  <div className="remove" onClick={() => onRemoved(item.time)}>
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div
                className={`timeline-marker ${item.checked ? "completed" : ""}`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
