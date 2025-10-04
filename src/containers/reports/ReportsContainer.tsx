import MonthlyProfit from './MonthyProfit';
import MyAsset from './MyAsset';
import MyType from './MyType';
import SectorsCircle from './SectorsCircle';
import StockHolding from './StockHolding';

export default function ReportsContainer() {
	return (
		<div>
			<MyType />
			<StockHolding />
			<SectorsCircle />
			<MonthlyProfit />
			<MyAsset />
		</div>
	);
}
