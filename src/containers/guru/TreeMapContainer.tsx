import { ResponsiveTreeMap } from '@nivo/treemap';
import { GuruTrade } from '@/types/guru';
export default function TreeMapContainer({ data }: { data: GuruTrade[] }) {
	const treeMapData = {
		name: '고수',
		children: data.map((stock, idx) => {
			return {
				id: stock.stockSymbol,
				name: stock.stockName,
				value: 100 - idx * 10,
			};
		}),
	};

	return (
		<div style={{ height: '300px', width: '100%' }}>
			<ResponsiveTreeMap
				data={treeMapData}
				identity="name"
				value="value"
				valueFormat=".2s"
				borderWidth={2}
				labelSkipSize={6}
				labelTextColor={{
					from: 'color',
					modifiers: [['brighter', 3.2]],
				}}
				colors={[
					'#102FA8',
					'#1539CB',
					'#0040e8',
					'#0046ff',
					'#005DF9',
					'#94ABFA',
					'#B3C8FF',
					'#e6edff',
				]}
				nodeOpacity={0.8}
				enableParentLabel={false}
				label={function (e) {
					return e.data.name;
				}}
			/>
		</div>
	);
}
