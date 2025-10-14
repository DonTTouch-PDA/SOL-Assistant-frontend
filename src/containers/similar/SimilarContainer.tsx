"use client";
import { useState } from "react";
import { SignalType } from "@/types/similar";
import FilterButtons from "@/components/common/FilterButtons";
import { FilterOption } from "@/components/common/FilterButtons";
import { SimilarChart } from "@/types/similar";
// import StockItem from "@/components/myStocks/StockItem";

export default function SimilarChartContainer() {
  const [isUserHasStock, setIsUserHasStock] = useState(true);
  const [signalType, setSignalType] = useState<SignalType>("buy");
  const signalOptions: FilterOption<SignalType>[] = [
    { value: "buy", label: "매수신호" },
    { value: "sell", label: "매도신호" },
  ];
  const [stocks, setStocks] = useState<SimilarChart[]>([]);

  return (
    <div>
      <div className="flex border-b mb-[16px] border-gray-200 relative">
        <button
          onClick={() => setIsUserHasStock(true)}
          className={`flex-1 pb-1 text-center transition-colors duration-300 ${
            isUserHasStock ? "text-black" : "text-gray-500"
          }`}
        >
          보유
        </button>
        <button
          onClick={() => setIsUserHasStock(false)}
          className={`flex-1 pb-1 text-center transition-colors duration-300 ${
            isUserHasStock ? "text-black" : "text-gray-500"
          }`}
        >
          미보유
        </button>

        <div
          className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${
            isUserHasStock ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        />
      </div>
      <FilterButtons
        activeFilter={signalType}
        onFilterChange={setSignalType}
        options={signalOptions}
      />
      {/*{stocks.map((stock) => (*/}
      {/*  <StockItem key={stock.code} />*/}
      {/*))}*/}
    </div>
  );
}
