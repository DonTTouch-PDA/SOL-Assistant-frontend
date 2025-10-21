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
				borderWidth={1}
				labelSkipSize={6}
				labelTextColor={{
					from: 'color',
					modifiers: [['brighter', 3.2]],
				}}
				colors={[
					'#102FA8',
					'#1839BA',
					'#1539CB',
					'#0040e8',
					'#0046ff',
					'#005DF9',
					'#4C7DFF',
					'#97AFFF',
					'#527AFE',
					'#94ABFA',
					'#ABBEFF',
					'#B3C8FF',
					'#CAD9FF',
					'#e6edff',
					'#ECF1FF',
				]}
				nodeOpacity={0.8}
				enableParentLabel={false}
				label={function (e) {
					const name = e.data.name;
					if (e.width < 60 && name.length > 5) {
						return `${name.slice(0, 4)}..`;
					} else if (e.width < 40 && name.length > 3) {
						return `${name.slice(0, 2)}..`;
					}
					return e.data.name;
				}}
				orientLabel={false}
			/>
		</div>
	);
}
