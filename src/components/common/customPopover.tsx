interface CustomPopoverProps {
	text: string;
	isShowPopover: boolean;
	upSideDown?: boolean;
}

export default function CustomPopOver({
	text,
	isShowPopover,
	upSideDown = false,
}: CustomPopoverProps) {
	return (
		<div className="relative">
			<div
				className={`absolute left-1/2 -translate-x-1/2 ${
					upSideDown ? 'top-full mt-2' : 'bottom-full mb-2'
				}
          transition-all duration-300 ease-in-out
          ${isShowPopover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
			>
				<div className="bg-[#005EF9] rounded-lg px-3 py-2 text-sm text-white shadow-md relative whitespace-nowrap">
					{text}
					{upSideDown ? (
						<div
							className="absolute left-1/2 bottom-full -translate-x-1/2 w-0 h-0
							border-x-8 border-x-transparent border-b-8 border-b-[#005EF9]"
						/>
					) : (
						<div
							className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0
							border-x-8 border-x-transparent border-t-8 border-t-[#005EF9]"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
