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
    <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4 sm:p-5">
      <h3 className="mb-3 text-base font-semibold text-yellow-900 sm:text-lg">
        Budget Alerts
      </h3>

      {alerts.map((alert, index) => (
        <div
          key={index}
          className="mb-2 break-words text-sm text-yellow-800 last:mb-0 sm:text-base"
        >
          Warning: {alert.message}
        </div>
      ))}
    </div>
  );
};

export default BudgetAlerts;
