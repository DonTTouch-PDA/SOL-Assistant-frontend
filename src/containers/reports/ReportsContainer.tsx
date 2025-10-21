import MonthlyProfit from './MonthlyProfit';
import MyAsset from './MyAsset';
import MyType from './MyType';
import SectorsCircle from './SectorsCircle';
import StockHolding from './StockHolding';

export default function ReportsContainer() {
	return (
		<div className="pb-3">
			<MyType />
			<StockHolding />
			<SectorsCircle />
			<MonthlyProfit />
			<MyAsset />
		</div>
	);
}
