import { useEffect, useState } from "react";
import budgetService from "../../services/budgetService";

const BudgetAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await budgetService.getBudgetAlerts();
        setAlerts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlerts();
  }, []);

  if (!alerts.length) return null;

  return (
    <div
      style={{ background: "#fff3cd", padding: "15px", marginBottom: "20px" }}
    >
      <h3>Budget Alerts</h3>

      {alerts.map((alert, index) => (
        <div key={index}>⚠ {alert.message}</div>
      ))}
    </div>
  );
};

export default BudgetAlerts;
